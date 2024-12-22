"use client";

import { Card } from "@/components/ui/card";
import { Brain, Target, Zap, Trophy } from "lucide-react";
import { LeetCodeUserData } from "@/lib/types";
import { calculateSuccessRate } from "@/lib/calculations";

interface StatsGridProps {
  userData: LeetCodeUserData;
}

export function StatsGrid({ userData }: StatsGridProps) {
  const successRate = calculateSuccessRate(userData);

  const stats = [
    {
      label: "Total Solved",
      value: userData.totalSolved || 0,
      icon: Trophy,
      color: "text-yellow-500",
    },
    {
      label: "Success Rate",
      value: `${successRate}%`,
      icon: Target,
      color: "text-green-500",
    },
    {
      label: "Hard Problems",
      value: userData.hardSolved || 0,
      icon: Brain,
      color: "text-red-500",
    },
    {
      label: "Current Streak",
      value: userData.streak || 0,
      icon: Zap,
      color: "text-blue-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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