import Image from "next/image";
import { CATEGORIES, type Profile } from "@/data/profile";

type Props = {
  profile: Profile;
  workCount: number;
  totalHearts: number;
};

export default function ProfileCard({ profile, workCount, totalHearts }: Props) {
  return (
    <header className="flex flex-col items-center gap-5 rounded-[32px] border border-oat bg-paper px-6 py-8 text-center sm:flex-row sm:gap-8 sm:px-8 sm:text-left">
      <div className="shrink-0 rounded-full border-2 border-dashed border-coral p-2">
        <Image
          src={profile.image}
          alt={`${profile.name} 프로필 사진`}
          width={144}
          height={144}
          priority
          unoptimized={profile.image.endsWith(".svg")}
          className="size-28 rounded-full bg-oat object-cover sm:size-36"
        />
      </div>

      <div className="min-w-0">
        <h1 className="font-display text-4xl font-bold tracking-wider text-cocoa sm:text-5xl">
          {profile.name}
        </h1>
        <p className="mt-3 leading-relaxed text-latte sm:text-lg">
          {profile.bio.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </p>
        <dl className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-1 text-latte sm:justify-start">
          <div className="flex gap-1.5">
            <dt>작품</dt>
            <dd className="font-bold text-cocoa tabular-nums">{workCount}</dd>
          </div>
          <div>
            <dt className="sr-only">분류</dt>
            <dd>{CATEGORIES.join(" · ")}</dd>
          </div>
          <div className="flex gap-1.5">
            <dt>받은 마음</dt>
            <dd className="font-bold text-cocoa tabular-nums">{totalHearts}</dd>
          </div>
        </dl>
      </div>
    </header>
  );
}
