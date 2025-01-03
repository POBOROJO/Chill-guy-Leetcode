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
import { ShareButtons } from "@/components/share-buttons";
import { BackButton } from "@/components/back-button";
import { ProblemRecommendations } from "@/components/problem-recommendations";
import { Footer } from "@/components/footer";
import { Loader2 } from "lucide-react";
import { calculateChillScore } from "@/lib/calculations";
import {
  LeetCodeError,
  LeetCodeErrorResponse,
  LeetCodeUserData,
} from "@/lib/types";
import { AnimatedHeader } from "@/components/animated-header";
import Link from "next/link";

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
      if (!response.ok) throw new Error("Failed to fetch user data");

      const data = await response.json();

      // Check for error response
      if (
        (data as LeetCodeErrorResponse).errors?.some((error: LeetCodeError) =>
          error.message.includes("user does not exist")
        )
      ) {
        toast({
          title: "User not found",
          description: "The provided username does not exist on LeetCode",
          variant: "destructive",
        });
        return;
      }
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

  const handleBack = () => {
    setUserData(null);
    setUsername("");
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted flex flex-col">
      <div className="container mx-auto px-4 py-16 flex-1 relative">
        {userData && <BackButton onBack={handleBack} />}
        
        {!userData ? (
          <div className="max-w-xl w-full space-y-8 mx-auto">
            <AnimatedHeader />
            <Card className="p-6">
              <div className="flex flex-col gap-4">
                <Input
                  placeholder="Enter LeetCode username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="h-12 text-lg"
                  onKeyDown={(e) => e.key === "Enter" && fetchUserData()}
                />
                <Button
                  size="lg"
                  onClick={fetchUserData}
                  disabled={loading}
                  className="w-full"
                >
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Analyze Profile
                </Button>
                <Link href="/compare" className="w-full">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full"
                  >
                    Compare Users
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        ) : (
          <div className="w-full max-w-7xl space-y-8 animate-in fade-in-50 mx-auto">
            <ChillGuyScore userData={userData} username={username} />
            <StatsGrid userData={userData} />
            <div className="grid md:grid-cols-2 gap-8">
              <ActivityChart userData={userData} />
              <DifficultyChart userData={userData} />
            </div>
            <ProblemRecommendations recentSubmissions={userData.recentSubmissions || []} />
            <div className="mt-12">
              <ShareButtons
                username={username}
                score={calculateChillScore(userData)}
              />
            </div>
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}