"use client";

import { Card } from "@/components/ui/card";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export function ActivityChart({ userData }: { userData: any }) {
  const data = Object.entries(userData.submissionCalendar || {}).map(
    ([timestamp, count]) => ({
      date: new Date(parseInt(timestamp) * 1000).toLocaleDateString(),
      submissions: count,
    })
  ).slice(-30);

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Submission Activity</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="submissions"
              stroke="hsl(var(--primary))"
              fill="hsl(var(--primary))"
              fillOpacity={0.2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}