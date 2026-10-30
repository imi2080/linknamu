import { Suspense } from "react";
import { connection } from "next/server";
import WorkGallery from "@/components/WorkGallery";
import { profile, works } from "@/data/profile";
import { getCounts } from "@/lib/counters";

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6 sm:py-12">
      {/* 마음 수를 불러오는 동안에는 처음 값으로 먼저 보여 준다. */}
      <Suspense
        fallback={
          <WorkGallery profile={profile} works={works} initialHearts={{}} />
        }
      >
        <GalleryWithHearts />
      </Suspense>

      <footer className="mt-12 text-center text-sm text-latte/80">
        카드를 누르면 작품 이야기와 도안·영상 링크를 볼 수 있어요.
      </footer>
    </main>
  );
}

async function GalleryWithHearts() {
  // 마음 수는 요청할 때마다 새로 읽는다.
  await connection();
  const hearts = await getCounts("hearts");

  return <WorkGallery profile={profile} works={works} initialHearts={hearts} />;
}
