"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ChillGuyScore } from "@/components/chill-guy-score";
import { StatsGrid } from "@/components/stats-grid";
import { ActivityChart } from "@/components/charts/activity-chart";
import { DifficultyChart } from "@/components/charts/difficulty-chart";
import { Loader2 } from "lucide-react";
import { LeetCodeUserData } from "@/lib/types";

export default function Home() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<LeetCodeUserData | null>(null);
  const { toast } = useToast();

  const fetchUserData = async () => {
    if (!username) {
      toast({
        title: "Username required",
        description: "Please enter a LeetCode username",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `https://leetcode-api-faisalshohag.vercel.app/${username}`
      );
      if (!response.ok) throw new Error('Failed to fetch user data');
      
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch user data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">
            LeetCode Chill Guy Analyzer
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Enter your LeetCode username to discover your Chill Guy Score™ and see how
            your problem-solving journey aligns with the zen of coding.
          </p>
        </div>

        <Card className="p-6">
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1">
              <Input
                placeholder="Enter LeetCode username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="h-12"
              />
            </div>
            <Button
              size="lg"
              onClick={fetchUserData}
              disabled={loading}
              className="w-full md:w-auto"
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Analyze Profile
            </Button>
          </div>
        </Card>

        {userData && (
          <div className="grid gap-8">
            <ChillGuyScore userData={userData} username={username} />
            <StatsGrid userData={userData} />
            <div className="grid md:grid-cols-2 gap-8">
              <ActivityChart userData={userData} />
              <DifficultyChart userData={userData} />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}