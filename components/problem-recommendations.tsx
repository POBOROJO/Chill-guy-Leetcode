"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RecentSubmission } from "@/lib/types";
import {
  COOLDOWN_PERIOD,
  getProblemRecommendations,
  LAST_REQUEST_KEY,
} from "@/lib/gemini";
import { Loader2, Brain, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { RainbowButton } from "./ui/rainbow-button";

interface ProblemRecommendationsProps {
  recentSubmissions: RecentSubmission[];
}

interface Recommendation {
  title: string;
  titleSlug: string;
  reason: string;
  difficulty: "Easy" | "Medium" | "Hard";
}

export function ProblemRecommendations({
  recentSubmissions,
}: ProblemRecommendationsProps) {
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [cooldownRemaining, setCooldownRemaining] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    const checkCooldown = () => {
      const lastRequest = localStorage.getItem(LAST_REQUEST_KEY);
      if (lastRequest) {
        const now = Date.now();
        const timeSinceLastRequest = now - parseInt(lastRequest);
        if (timeSinceLastRequest < COOLDOWN_PERIOD) {
          setCooldownRemaining(
            Math.ceil((COOLDOWN_PERIOD - timeSinceLastRequest) / 1000)
          );
        } else {
          setCooldownRemaining(0);
        }
      } else {
        setCooldownRemaining(0);
      }
    };

    // Initial check
    checkCooldown();

    // Set up interval
    const interval = setInterval(checkCooldown, 1000);

    // Cleanup
    return () => clearInterval(interval);
  }, []);

  const getRecommendations = async () => {
    setLoading(true);
    try {
      // Get unique solved problems
      const uniqueSolvedProblems = Array.from(
        new Set(
          recentSubmissions
            .filter((sub) => sub.statusDisplay === "Accepted")
            .map((sub) => sub.title)
        )
      );

      const recommendations = await getProblemRecommendations(
        uniqueSolvedProblems
      );
      setRecommendations(recommendations);
      setCooldownRemaining(120);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get problem recommendations. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return "bg-green-500/10 text-green-500";
      case "medium":
        return "bg-yellow-500/10 text-yellow-500";
      case "hard":
        return "bg-red-500/10 text-red-500";
      default:
        return "bg-gray-500/10 text-gray-500";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        {cooldownRemaining > 0 ? (
          <p className="text-muted-foreground">
            Cooldown ends in {cooldownRemaining} seconds
          </p>
        ) : (
          <RainbowButton
            onClick={getRecommendations}
            disabled={loading}
            className="w-full md:w-auto"
          >
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Brain className="mr-2 h-4 w-4" />
            )}
            Get Problem Recommendations
          </RainbowButton>
        )}
      </div>

      {recommendations.length > 0 && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Recommended Problems</h3>
          <div className="space-y-4">
            {recommendations.map((rec, index) => (
              <div key={index} className="p-4 bg-muted rounded-lg">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <a
                        href={`https://leetcode.com/problems/${rec.titleSlug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium hover:text-primary flex items-center gap-1"
                      >
                        {rec.title}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                      <Badge
                        className={`${getDifficultyColor(rec.difficulty)}`}
                      >
                        {rec.difficulty}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {rec.reason}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}


