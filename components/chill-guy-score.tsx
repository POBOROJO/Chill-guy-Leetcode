"use client";

import { Card } from "@/components/ui/card";
import Image from "next/image";
import { calculateChillScore } from "@/lib/calculations";
import { LeetCodeUserData } from "@/lib/types";
import { getImageUrl } from "@/lib/utils";
import { getChillMessage } from "@/lib/chillMessages";

interface ChillGuyScoreProps {
  userData: LeetCodeUserData;
  username: string;
}

export function ChillGuyScore({ userData, username }: ChillGuyScoreProps) {
  const percent = calculateChillScore(userData);
  const imageUrl = getImageUrl('/chill_guy2.webp');
  const message = getChillMessage(percent);

  return (
    <Card className="p-6" id="score-card">
      <div className="flex flex-col items-center gap-8">
        <div className="text-center">
          <div className="relative w-49 h-49">
            <Image
              src={imageUrl}
              alt="Chill Guy"
              width={300}
              height={300}
              className="rounded-full w-[200px] h-[200px] md:w-[300px] md:h-[300px]"
              priority
              unoptimized
            />
          </div>
          <p className="text-2xl font-medium text-muted-foreground mt-4 mr-2">
            {username}
          </p>
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Your Chill Guy level</h2>
          <div className="text-6xl font-bold text-primary mb-4 ml-14">{percent}%</div>
          <p className="text-muted-foreground">
            {message}
          </p>
        </div>
      </div>
    </Card>
  );
}