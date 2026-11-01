import Image from "next/image";
import type { Work } from "@/data/profile";
import WorkMeta from "./WorkMeta";

type Props = {
  work: Work;
  hearts: number;
  hearted: boolean;
  onOpen: (work: Work) => void;
  onHeart: (work: Work) => void;
};

export default function WorkCard({
  work,
  hearts,
  hearted,
  onOpen,
  onHeart,
}: Props) {
  return (
    <article className="relative flex h-full gap-4 rounded-2xl border border-white/70 bg-paper/80 p-3 shadow-[0_1px_2px_rgb(31_27_25/0.04)] backdrop-blur transition hover:-translate-y-px hover:bg-paper hover:shadow-[0_8px_24px_-12px_rgb(120_70_50/0.3)]">
      <div
        className="flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-xl sm:size-24"
        style={{ backgroundColor: work.tint }}
      >
        <Image
          src={work.image}
          alt=""
          width={96}
          height={96}
          unoptimized={work.image.endsWith(".svg")}
          className="size-full object-contain"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col py-0.5">
        <h3 className="truncate text-[15px] font-bold text-cocoa">
          {/* 제목 버튼이 카드 전체를 덮어, 카드 어디를 눌러도 상세 보기가 열린다. */}
          <button
            type="button"
            onClick={() => onOpen(work)}
            aria-haspopup="dialog"
            className="cursor-pointer text-left after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-coral"
          >
            {work.title}
          </button>
        </h3>
        <p className="mt-1 line-clamp-2 text-[13px] leading-relaxed text-latte">
          {work.description}
        </p>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-2">
          <WorkMeta work={work} />
          {/* 카드 위에 올려 두어 하트를 눌러도 상세 보기가 열리지 않게 한다. */}
          <button
            type="button"
            onClick={() => onHeart(work)}
            aria-pressed={hearted}
            aria-label={`${work.title}에 마음 보내기, 받은 마음 ${hearts}개`}
            className={`relative z-10 flex cursor-pointer items-center gap-1 rounded-full px-2.5 py-1 text-xs tabular-nums transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral ${
              hearted
                ? "bg-coral text-white"
                : "text-latte hover:bg-blush hover:text-coral"
            }`}
          >
            <span aria-hidden>♥</span>
            {hearts}
          </button>
        </div>
      </div>
    </article>
  );
}
