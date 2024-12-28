import { Card } from "@/components/ui/card";
import { Crown, Target, Zap, Trophy, Flame } from "lucide-react";
import { LeetCodeUserData } from "@/lib/types";
import { calculateSuccessRate, calculateCurrentStreak } from "@/lib/calculations";
import { calculateLongestStreak } from "@/lib/calculateLongestStreak";

interface StatsGridProps {
  userData: LeetCodeUserData;
}

export function StatsGrid({ userData }: StatsGridProps) {
  const successRate = calculateSuccessRate(userData);
  const currentStreak = calculateCurrentStreak(userData);
  const longestStreak = calculateLongestStreak(userData.submissionCalendar);

  const stats = [
    {
      label: "Total Solved",
      value: userData.totalSolved || 0,
      icon: Trophy,
      color: "text-yellow-500",
    },
    {
      label: "Acceptance Rate",
      value: `${successRate}%`,
      icon: Target,
      color: "text-green-500",
    },
    {
      label: "Current Streak",
      value: currentStreak,
      icon: Zap,
      color: "text-blue-500",
    },
    {
      label: "Longest Streak",
      value: longestStreak,
      icon: Flame,
      color: "text-orange-500",
    },
    {
      label: "Ranking",
      value: userData.ranking?.toLocaleString() || "N/A",
      icon: Crown,
      color: "text-purple-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {stats.map((stat) => (
        <Card key={stat.label} className="p-6">
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-full bg-muted ${stat.color}`}>
              <stat.icon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}