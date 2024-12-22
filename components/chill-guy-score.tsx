"use client";

import { Card } from "@/components/ui/card";
import Image from "next/image";
import { calculateChillScore } from "@/lib/calculations";
import { LeetCodeUserData } from "@/lib/types";
import { getImageUrl } from "@/lib/utils";

interface ChillGuyScoreProps {
  userData: LeetCodeUserData;
  username: string;
}

export function ChillGuyScore({ userData, username }: ChillGuyScoreProps) {
  const score = calculateChillScore(userData);
  const imageUrl = getImageUrl('/chill_guy.webp');

  return (
    <Card className="p-6" id="score-card">
      <div className="flex flex-col items-center gap-8">
        <div className="text-center">
          <div className="relative w-48 h-48">
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
          <p className="text-lg font-medium text-muted-foreground mt-4 mr-9">
            {username}
          </p>
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Your Chill Guy Score™</h2>
          <div className="text-6xl font-bold text-primary mb-4">{score}%</div>
          <p className="text-muted-foreground">
            Based on your problem-solving patterns, consistency, and overall approach
            to coding challenges.
          </p>
        </div>
      </div>
    </Card>
  );
}