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
    <article className="relative flex h-full gap-4 rounded-[28px] border border-oat bg-paper p-4 transition hover:-translate-y-0.5 hover:border-blush sm:gap-5 sm:p-5">
      <div
        className="flex size-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl sm:size-36"
        style={{ backgroundColor: work.tint }}
      >
        <Image
          src={work.image}
          alt=""
          width={144}
          height={144}
          unoptimized={work.image.endsWith(".svg")}
          className="size-full object-contain"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <h3 className="text-lg font-bold text-cocoa sm:text-xl">
          {/* 제목 버튼이 카드 전체를 덮어, 카드 어디를 눌러도 상세 보기가 열린다. */}
          <button
            type="button"
            onClick={() => onOpen(work)}
            aria-haspopup="dialog"
            className="cursor-pointer text-left after:absolute after:inset-0 after:rounded-[28px] focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-coral"
          >
            {work.title}
          </button>
        </h3>
        <p className="mt-1.5 line-clamp-2 leading-relaxed text-latte">
          {work.description}
        </p>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-3">
          <WorkMeta work={work} />
          {/* 카드 위에 올려 두어 하트를 눌러도 상세 보기가 열리지 않게 한다. */}
          <button
            type="button"
            onClick={() => onHeart(work)}
            aria-pressed={hearted}
            aria-label={`${work.title}에 마음 보내기, 받은 마음 ${hearts}개`}
            className={`relative z-10 flex cursor-pointer items-center gap-1.5 rounded-full px-4 py-1.5 tabular-nums transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral ${
              hearted
                ? "bg-coral text-white"
                : "bg-blush text-coral hover:bg-[#f2cfca]"
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
