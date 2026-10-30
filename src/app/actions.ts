"use server";

import { works } from "@/data/profile";
import { incrementCount } from "@/lib/counters";

// 서버 함수는 직접 POST로도 호출할 수 있으므로 등록된 작품만 받는다.
function isKnownWork(workId: string) {
  return works.some((work) => work.id === workId);
}

export async function incrementClick(workId: string): Promise<number | null> {
  if (!isKnownWork(workId)) return null;
  return incrementCount("clicks", workId);
}

// DB에 쌓인 마음 수를 돌려준다. (화면에는 baseHearts를 더해 표시)
export async function sendHeart(workId: string): Promise<number | null> {
  if (!isKnownWork(workId)) return null;
  return incrementCount("hearts", workId);
}
