import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chill Guy Leetcode Analyzer",
  description:
    "Discover how chill are you and see how your problem-solving journey aligns with the zen of coding.",
  keywords: [
    "LeetCode",
    "Chill guy",
    "Chill guy leetcode",
    "Chill guy analyzer",
    "LeetCode chill guy",
    "LeetCode chill guy analyzer",
    "Chill guy stats",
    "Chill guy level",
    "Chill guy score",
    "LeetCode analyzer",
    "coding style",
    "programming challenges",
    "coding metrics",
    "developer tools",
    "coding practice",
    "problem solving",
    "algorithm practice",
    "coding zen",
    "LeetCode stats",
  ],
  authors: [{ name: "Parijat Bhattacharjee" }],
  creator: "Parijat Bhattacharjee",
  publisher: "Parijat Bhattacharjee",
  openGraph: {
    title: "Chill Guy LeetCode Analyzer | Check Your Coding Zen",
    description:
      "Discover your LeetCode chill score and see how your problem-solving journey aligns with the zen of coding.",
    url: "https://chillguy-leetcode.vercel.app/",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
