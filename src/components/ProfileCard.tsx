import Image from "next/image";
import { CATEGORIES, type Profile } from "@/data/profile";

type Props = {
  profile: Profile;
  workCount: number;
  totalHearts: number;
};

export default function ProfileCard({ profile, workCount, totalHearts }: Props) {
  return (
    <header className="flex flex-col items-center text-center">
      <div className="shrink-0 rounded-full border border-dashed border-coral p-1.5">
        <Image
          src={profile.image}
          alt={`${profile.name} 프로필 사진`}
          width={96}
          height={96}
          priority
          unoptimized={profile.image.endsWith(".svg")}
          className="size-24 rounded-full bg-oat object-cover"
        />
      </div>

      <div className="mt-5 min-w-0">
        <h1 className="text-2xl font-bold tracking-tight text-cocoa">
          {profile.name}
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-latte">
          {profile.bio.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </p>
        <dl className="mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-latte">
          <div className="flex gap-1.5">
            <dt>작품</dt>
            <dd className="font-bold text-cocoa tabular-nums">{workCount}</dd>
          </div>
          <div className="border-x border-cocoa/10 px-4">
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
