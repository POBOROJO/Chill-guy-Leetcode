"use client";

import { Card } from "@/components/ui/card";
import { LeetCodeUserData } from "@/lib/types";
import { calculateChillScore } from "@/lib/calculations";
import { calculateLongestStreak } from "@/lib/calculateLongestStreak";
import { Crown, Target, Zap, Trophy, Flame } from "lucide-react";
import { color } from "framer-motion";

interface ComparisonTableProps {
  usersData: Record<string, LeetCodeUserData>;
}

export function ComparisonTable({ usersData }: ComparisonTableProps) {
  const metrics = [
    {
      label: "Problems Solved",
      getValue: (data: LeetCodeUserData) => data.totalSolved || 0,
      icon: Trophy,
      color: "text-yellow-500",
    },
    {
      label: "Ranking",
      getValue: (data: LeetCodeUserData) =>
        data.ranking?.toLocaleString() || "N/A",
      icon: Crown,
      color: "text-purple-500",
    },
    {
      label: "Longest Streak",
      getValue: (data: LeetCodeUserData) =>
        calculateLongestStreak(data.submissionCalendar),
      icon: Flame,
      color: "text-orange-500",
    },
    {
      label: "Chill Percentage",
      getValue: (data: LeetCodeUserData) => `${calculateChillScore(data)}%`,
      icon: Target,
      color: "text-green-500",
    },
  ];

  return (
    <Card className="p-6">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">Metric</th>
              {Object.keys(usersData).map((username) => (
                <th key={username} className="text-left p-2">
                  {username}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {metrics.map((metric) => (
              <tr key={metric.label} className="border-b">
                <td className="p-2 font-medium">
                  <div className="flex items-center gap-2">
                    <metric.icon className={`h-4 w-4 ${metric.color}`} />
                    {metric.label}
                  </div>
                </td>
                {Object.values(usersData).map((userData, index) => (
                  <td key={index} className="p-2">
                    {metric.getValue(userData)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
