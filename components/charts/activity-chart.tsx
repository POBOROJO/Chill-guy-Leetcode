"use client";

import { ChartWrapper } from "./chart-wrapper";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { LeetCodeUserData } from "@/lib/types";
import { formatDate } from "@/lib/utils";

interface ActivityChartProps {
  userData: LeetCodeUserData;
}

export function ActivityChart({ userData }: ActivityChartProps) {
  const data = Object.entries(userData.submissionCalendar || {})
    .map(([timestamp, count]) => ({
      date: formatDate(new Date(parseInt(timestamp) * 1000)),
      submissions: count,
    }))
    .slice(-30);

  return (
    <ChartWrapper title="Submission Activity">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorSubmissions" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.2} />
              <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => value.split(',')[0]}
          />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="submissions"
            stroke="hsl(var(--primary))"
            fill="url(#colorSubmissions)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
}