"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import type { Work } from "@/data/profile";
import WorkMeta from "./WorkMeta";

type Props = {
  work: Work | null;
  onClose: () => void;
};

export default function WorkModal({ work, onClose }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (work && !dialog.open) dialog.showModal();
    if (!work && dialog.open) dialog.close();
  }, [work]);

  return (
    <dialog
      ref={dialogRef}
      // Esc 키로 닫을 때도 close 이벤트가 온다.
      onClose={onClose}
      // 내용 바깥(배경)을 누르면 닫는다.
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      aria-labelledby="work-modal-title"
      className="m-auto max-h-[92dvh] w-[calc(100%-2rem)] max-w-md overflow-y-auto rounded-[28px] bg-cream p-0 text-cocoa shadow-xl backdrop:bg-cocoa/50"
    >
      {work && (
        <div className="relative p-4">
          <button
            type="button"
            onClick={onClose}
            aria-label="닫기"
            className="absolute top-6 right-6 flex size-9 cursor-pointer items-center justify-center rounded-full bg-white/90 text-lg text-cocoa shadow transition hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral"
          >
            ✕
          </button>

          <Image
            src={work.image}
            alt={work.title}
            width={work.imageWidth}
            height={work.imageHeight}
            sizes="(max-width: 448px) 100vw, 448px"
            unoptimized={work.image.endsWith(".svg")}
            className="max-h-[55dvh] w-full rounded-2xl object-contain"
            style={{ backgroundColor: work.tint }}
          />

          <h2
            id="work-modal-title"
            className="mt-4 text-center text-2xl font-bold"
          >
            {work.title}
          </h2>
          <div className="mt-2 flex justify-center">
            <WorkMeta work={work} />
          </div>
          <p className="mt-3 leading-relaxed text-latte">{work.description}</p>

          <a
            href={work.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 block rounded-full bg-coral px-5 py-3 text-center font-bold text-white transition hover:bg-cocoa focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral"
          >
            {work.urlLabel} ↗
          </a>
        </div>
      )}
    </dialog>
  );
}
