"use client";

import { Card } from "@/components/ui/card";
import Image from "next/image";
import { calculateChillScore } from "@/lib/calculations";
import { ShareButtons } from "@/components/share-buttons";
import { LeetCodeUserData } from "@/lib/types";
import { getImageUrl } from "@/lib/utils";

interface ChillGuyScoreProps {
  userData: LeetCodeUserData;
  username: string;
}

export function ChillGuyScore({ userData, username }: ChillGuyScoreProps) {
  console.log("UserData:", userData);
  const score = calculateChillScore(userData);
  console.log("Calculated Score:", score);
  const imageUrl = getImageUrl("/chill_guy.webp");

  return (
    <div>
      <Card className="p-6" id="score-card">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="relative w-48 h-48 flex-shrink-0">
            <Image
              src={imageUrl}
              alt="Chill Guy"
              width={192}
              height={192}
              className="rounded-full"
              priority
              unoptimized
            />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-bold mb-2">Your Chill Guy Score</h2>
            <div className="text-6xl font-bold text-primary mb-4">
              {typeof score === "number" ? `${score}%` : "N/A"}
            </div>
            <p className="text-muted-foreground">
              Based on your problem-solving patterns, consistency, and overall
              approach to coding challenges.
            </p>
          </div>
        </div>
      </Card>
      <ShareButtons username={username} score={score} />
    </div>
  );
}
