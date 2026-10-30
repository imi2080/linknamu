export type Profile = {
  name: string;
  // 한 줄씩 나눠 표시한다.
  bio: string[];
  image: string;
};

export const CATEGORIES = ["대바늘", "코바늘", "인형"] as const;
export type Category = (typeof CATEGORIES)[number];

export const LEVEL_LABELS = { 1: "입문", 2: "초급", 3: "중급" } as const;
export type Level = keyof typeof LEVEL_LABELS;

export type Work = {
  id: string;
  title: string;
  description: string;
  image: string;
  imageWidth: number;
  imageHeight: number;
  // 썸네일 칸의 배경색 (그림 배경색과 맞춘다)
  tint: string;
  category: Category;
  level: Level;
  // 최신순 정렬 기준 (YYYY-MM-DD)
  createdAt: string;
  url: string;
  urlLabel: string;
  // DB에 쌓인 마음 수에 더해 보여 주는 처음 값
  baseHearts: number;
};

export const profile: Profile = {
  name: "김뜨개",
  bio: [
    "한 코 한 코, 마음을 엮는 손뜨개 기록장입니다.",
    "도안과 실 정보까지 함께 나눠요.",
  ],
  image: "/profile.svg",
};

export const works: Work[] = [
  {
    id: "rose-scarf",
    title: "장미빛 줄무늬 목도리",
    description:
      "메리노 울 100% 실로 뜬 겨울 목도리예요. 양 끝에 크림색 줄무늬를 넣어 포인트를 줬어요. 고무뜨기로 도톰하게 떠서 목에 두 번 감아도 답답하지 않고, 술은 손으로 하나하나 묶었습니다. 뜨는 과정은 인스타그램에 기록해 두었어요.",
    image: "/works/scarf.svg",
    imageWidth: 600,
    imageHeight: 900,
    tint: "#f6e9dc",
    category: "대바늘",
    level: 2,
    createdAt: "2026-10-20",
    url: "https://www.instagram.com/",
    urlLabel: "인스타그램에서 보기",
    baseHearts: 24,
  },
  {
    id: "pompom-beanie",
    title: "방울 달린 세이지 비니",
    description:
      "초보자도 하루면 완성할 수 있는 원통뜨기 비니예요. 꼭대기에 크림색 방울을 달았어요. 챙은 2코 고무뜨기로 탄탄하게 잡았고, 블로그에 코 수와 도안을 정리해 두었습니다.",
    image: "/works/beanie.svg",
    imageWidth: 800,
    imageHeight: 800,
    tint: "#e6eee0",
    category: "대바늘",
    level: 1,
    createdAt: "2026-10-12",
    url: "https://blog.naver.com/",
    urlLabel: "블로그에서 도안 보기",
    baseHearts: 41,
  },
  {
    id: "granny-blanket",
    title: "그래니 스퀘어 무릎담요",
    description:
      "자투리 실을 모아 코바늘로 뜬 모티브 담요예요. 정사각형 48장을 이어 붙였어요. 색 조합을 고르는 데 뜨는 시간만큼 걸렸답니다. 모티브 뜨는 법과 잇는 법은 영상으로 올려 두었어요.",
    image: "/works/blanket.svg",
    imageWidth: 900,
    imageHeight: 600,
    tint: "#f3e7d8",
    category: "코바늘",
    level: 2,
    createdAt: "2026-09-28",
    url: "https://www.youtube.com/",
    urlLabel: "유튜브에서 영상 보기",
    baseHearts: 57,
  },
  {
    id: "bear-doll",
    title: "목도리 두른 곰 인형",
    description:
      "면사로 촘촘하게 뜬 손바닥 크기의 아미구루미 곰이에요. 작은 목도리는 따로 떠서 둘렀어요. 솜을 넉넉히 채워 말랑하고, 주문 제작은 스토어에서 받고 있습니다.",
    image: "/works/bear.svg",
    imageWidth: 700,
    imageHeight: 900,
    tint: "#f4e4e0",
    category: "인형",
    level: 3,
    createdAt: "2026-09-15",
    url: "https://smartstore.naver.com/",
    urlLabel: "스토어에서 주문하기",
    baseHearts: 33,
  },
  {
    id: "snow-mittens",
    title: "눈송이 무늬 벙어리장갑",
    description:
      "배색뜨기로 눈송이 점무늬를 넣은 장갑이에요. 엄지 구멍은 별도 실로 표시해 두고 떴어요. 손목은 고무뜨기로 길게 떠서 찬바람이 들어오지 않아요. 배색 도안은 블로그에 올려 두었습니다.",
    image: "/works/mittens.svg",
    imageWidth: 700,
    imageHeight: 900,
    tint: "#e4eaf4",
    category: "대바늘",
    level: 3,
    createdAt: "2026-08-30",
    url: "https://blog.naver.com/",
    urlLabel: "블로그에서 배색 도안 보기",
    baseHearts: 19,
  },
  {
    id: "sunflower-coasters",
    title: "해바라기 컵받침 세트",
    description:
      "원형뜨기 연습에 좋은 컵받침이에요. 한 장에 30분이면 떠요. 면사로 떠서 물기를 잘 머금고, 네 장을 다른 색으로 떠서 세트로 쓰고 있어요. 뜨는 순서는 영상으로 남겨 두었습니다.",
    image: "/works/coasters.svg",
    imageWidth: 800,
    imageHeight: 800,
    tint: "#f7efd9",
    category: "코바늘",
    level: 1,
    createdAt: "2026-08-10",
    url: "https://www.youtube.com/",
    urlLabel: "유튜브에서 영상 보기",
    baseHearts: 28,
  },
];
