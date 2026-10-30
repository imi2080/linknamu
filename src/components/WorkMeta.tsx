import { LEVEL_LABELS, type Work } from "@/data/profile";

// 분류 태그와 난이도 점 (예: 대바늘 ●●○ 초급)
export default function WorkMeta({ work }: { work: Work }) {
  const label = LEVEL_LABELS[work.level];

  return (
    <span className="flex items-center gap-3">
      <span className="rounded-full bg-oat px-3 py-1 text-sm text-latte">
        {work.category}
      </span>
      <span
        className="flex items-center gap-1.5 text-sm text-latte"
        aria-label={`난이도 ${label}`}
      >
        <span className="flex gap-0.5" aria-hidden>
          {[1, 2, 3].map((step) => (
            <span
              key={step}
              className={`size-2.5 rounded-full border-[1.5px] border-sage ${
                step <= work.level ? "bg-sage" : "bg-transparent"
              }`}
            />
          ))}
        </span>
        <span aria-hidden>{label}</span>
      </span>
    </span>
  );
}
