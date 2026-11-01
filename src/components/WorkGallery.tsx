"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import { incrementClick, sendHeart } from "@/app/actions";
import { CATEGORIES, type Category, type Profile, type Work } from "@/data/profile";
import type { Counts } from "@/lib/counters";
import ProfileCard from "./ProfileCard";
import WorkCard from "./WorkCard";
import WorkModal from "./WorkModal";

type Props = {
  profile: Profile;
  works: Work[];
  // DB에 쌓인 마음 수 (baseHearts는 포함하지 않음)
  initialHearts: Counts;
};

type Filter = "전체" | Category;
type Sort = "latest" | "popular";

// 이 브라우저에서 이미 마음을 보낸 작품 id 목록 (JSON 배열 문자열)
const HEARTED_KEY = "linktarae:hearted";
const HEARTED_EVENT = "linktarae:hearted-change";
// 저장소를 쓸 수 없는 환경에서는 이번 방문 동안만 기억한다.
let memoryHearted = "[]";

function readHeartedRaw(): string {
  try {
    return localStorage.getItem(HEARTED_KEY) ?? memoryHearted;
  } catch {
    return memoryHearted;
  }
}

function writeHearted(ids: string[]) {
  memoryHearted = JSON.stringify(ids);
  try {
    localStorage.setItem(HEARTED_KEY, memoryHearted);
  } catch {
    // memoryHearted에 남아 있다.
  }
  window.dispatchEvent(new Event(HEARTED_EVENT));
}

function subscribeHearted(onChange: () => void) {
  window.addEventListener(HEARTED_EVENT, onChange);
  // 다른 탭에서 바뀐 것도 반영한다.
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(HEARTED_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

function parseHearted(raw: string): string[] {
  try {
    const ids = JSON.parse(raw);
    return Array.isArray(ids) ? ids : [];
  } catch {
    return [];
  }
}

export default function WorkGallery({ profile, works, initialHearts }: Props) {
  const [hearts, setHearts] = useState(initialHearts);
  const [filter, setFilter] = useState<Filter>("전체");
  const [sort, setSort] = useState<Sort>("latest");
  const [selected, setSelected] = useState<Work | null>(null);

  // 서버 렌더링 때는 빈 목록으로 그리고, 화면이 뜬 뒤 저장된 값으로 바꾼다.
  const heartedRaw = useSyncExternalStore(
    subscribeHearted,
    readHeartedRaw,
    () => "[]",
  );
  const hearted = useMemo(() => parseHearted(heartedRaw), [heartedRaw]);

  const heartsOf = (work: Work) => work.baseHearts + (hearts[work.id] ?? 0);
  const totalHearts = works.reduce((sum, work) => sum + heartsOf(work), 0);

  const tabs: { value: Filter; count: number }[] = [
    { value: "전체", count: works.length },
    ...CATEGORIES.map((category) => ({
      value: category,
      count: works.filter((work) => work.category === category).length,
    })),
  ];

  const visible = works
    .filter((work) => filter === "전체" || work.category === filter)
    .sort((a, b) =>
      sort === "popular"
        ? heartsOf(b) - heartsOf(a)
        : b.createdAt.localeCompare(a.createdAt),
    );

  function handleOpen(work: Work) {
    setSelected(work);
    incrementClick(work.id).catch((error) => console.error(error));
  }

  function handleHeart(work: Work) {
    if (hearted.includes(work.id)) return;

    writeHearted([...hearted, work.id]);

    // 화면에는 바로 1을 올리고, 저장이 끝나면 서버 값으로 맞춘다.
    setHearts((prev) => ({ ...prev, [work.id]: (prev[work.id] ?? 0) + 1 }));
    sendHeart(work.id)
      .then((saved) => {
        if (saved !== null) {
          setHearts((prev) => ({ ...prev, [work.id]: saved }));
        }
      })
      .catch((error) => console.error(error));
  }

  return (
    <>
      <ProfileCard
        profile={profile}
        workCount={works.length}
        totalHearts={totalHearts}
      />

      <section aria-labelledby="works-heading" className="mt-10">
        <h2 id="works-heading" className="sr-only">
          뜨개 작품
        </h2>

        <div className="flex items-center justify-between gap-3">
          {/* 화면이 좁으면 탭 줄만 가로로 넘겨 본다. */}
          <div className="flex min-w-0 gap-0.5 overflow-x-auto [scrollbar-width:none] rounded-full bg-paper/60 p-1 ring-1 ring-cocoa/5 backdrop-blur">
            {tabs.map((tab) => {
              const active = tab.value === filter;
              return (
                <button
                  key={tab.value}
                  type="button"
                  onClick={() => setFilter(tab.value)}
                  aria-pressed={active}
                  className={`flex shrink-0 cursor-pointer items-center gap-1 rounded-full px-2.5 py-1.5 text-sm whitespace-nowrap sm:px-3 transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral ${
                    active
                      ? "bg-paper font-bold text-cocoa shadow-sm"
                      : "text-latte hover:text-cocoa"
                  }`}
                >
                  {tab.value}
                  <span
                    className={`text-xs tabular-nums ${active ? "text-coral" : "text-latte/70"}`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          <label className="shrink-0 text-sm text-latte">
            <span className="sr-only">정렬</span>
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value as Sort)}
              className="cursor-pointer rounded-full bg-transparent px-2 py-1.5 text-sm text-latte hover:text-cocoa focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral"
            >
              <option value="latest">최신순</option>
              <option value="popular">인기순</option>
            </select>
          </label>
        </div>

        <ul className="mt-4 grid gap-3 md:grid-cols-2">
          {visible.map((work) => (
            <li key={work.id}>
              <WorkCard
                work={work}
                hearts={heartsOf(work)}
                hearted={hearted.includes(work.id)}
                onOpen={handleOpen}
                onHeart={handleHeart}
              />
            </li>
          ))}
        </ul>
      </section>

      <WorkModal work={selected} onClose={() => setSelected(null)} />
    </>
  );
}
