import { LEVEL_LABELS, type Work } from "@/data/profile";

// 분류 태그와 난이도 점 (예: 대바늘 ●●○ 초급)
export default function WorkMeta({ work }: { work: Work }) {
  const label = LEVEL_LABELS[work.level];

  return (
    <span className="flex items-center gap-2.5">
      <span className="rounded-md bg-oat/70 px-2 py-0.5 text-xs text-latte">
        {work.category}
      </span>
      <span
        className="flex items-center gap-1.5 text-xs text-latte"
        aria-label={`난이도 ${label}`}
      >
        <span className="flex gap-0.5" aria-hidden>
          {[1, 2, 3].map((step) => (
            <span
              key={step}
              className={`size-1.5 rounded-full ${
                step <= work.level ? "bg-sage" : "bg-oat"
              }`}
            />
          ))}
        </span>
        <span aria-hidden>{label}</span>
      </span>
    </span>
  );
}
