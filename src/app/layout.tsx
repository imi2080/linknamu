import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// src/fonts에 있는 Pretendard를 직접 내려 준다.
const pretendard = localFont({
  src: [
    { path: "../fonts/Pretendard-Light.otf", weight: "300", style: "normal" },
    { path: "../fonts/Pretendard-Regular.otf", weight: "400", style: "normal" },
    { path: "../fonts/Pretendard-Bold.otf", weight: "700", style: "normal" },
  ],
  variable: "--font-pretendard",
  display: "swap",
  // 파일마다 1.5MB가 넘어서 미리 받지 않고, 실제로 쓰일 때만 받는다.
  preload: false,
});

export const metadata: Metadata = {
  title: "링크타래 | 아트곽",
  description: "한 코 한 코, 마음을 엮는 아트곽의 작품과 링크 모음",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className={`${pretendard.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
