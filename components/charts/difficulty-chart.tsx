"use client";

import { ChartWrapper } from "./chart-wrapper";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { LeetCodeUserData } from "@/lib/types";

interface DifficultyChartProps {
  userData: LeetCodeUserData;
}

export function DifficultyChart({ userData }: DifficultyChartProps) {
  const data = [
    { name: "Easy", value: userData.easySolved || 0 },
    { name: "Medium", value: userData.mediumSolved || 0 },
    { name: "Hard", value: userData.hardSolved || 0 },
  ].filter(item => item.value > 0);

  const COLORS = ["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))"];

  if (data.length === 0) {
    return null;
  }

  return (
    <ChartWrapper title="Problem Difficulty Distribution">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${entry.name}`} 
                fill={COLORS[index % COLORS.length]} 
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
}