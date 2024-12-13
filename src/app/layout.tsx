import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";

const vazirmatn = Vazirmatn({
  subsets: ['latin', 'arabic'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: "تورنیدو",
  description: "پلتفرم جامع جستجو و رزرو تور مسافرتی آنلاین",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={vazirmatn.className} lang="fa" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
