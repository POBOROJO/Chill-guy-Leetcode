"use client";

import { Card } from "@/components/ui/card";

interface ChartWrapperProps {
  title: string;
  children: React.ReactNode;
}

export function ChartWrapper({ title, children }: ChartWrapperProps) {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <div className="h-[300px]">{children}</div>
    </Card>
  );
}