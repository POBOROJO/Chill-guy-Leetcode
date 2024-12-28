"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Plus, X } from "lucide-react";
import { LeetCodeUserData } from "@/lib/types";
import { ComparisonTable } from "./comparison-table";

export function UserComparison() {
  const [usernames, setUsernames] = useState<string[]>([""]);
  const [loading, setLoading] = useState(false);
  const [usersData, setUsersData] = useState<Record<string, LeetCodeUserData>>({});
  const { toast } = useToast();

  const addUsername = () => {
    if (usernames.length < 5) {
      setUsernames([...usernames, ""]);
    }
  };

  const removeUsername = (index: number) => {
    const newUsernames = usernames.filter((_, i) => i !== index);
    setUsernames(newUsernames);
  };

  const updateUsername = (index: number, value: string) => {
    const newUsernames = [...usernames];
    newUsernames[index] = value;
    setUsernames(newUsernames);
  };

  const fetchUserData = async () => {
    const validUsernames = usernames.filter(username => username.trim());
    
    if (validUsernames.length === 0) {
      toast({
        title: "Username required",
        description: "Please enter at least one LeetCode username",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    const newUsersData: Record<string, LeetCodeUserData> = {};

    try {
      await Promise.all(
        validUsernames.map(async (username) => {
          const response = await fetch(
            `https://leetcode-api-faisalshohag.vercel.app/${username}`
          );
          if (!response.ok) return;

          const data = await response.json();
          if (!data.errors) {
            newUsersData[username] = data;
          }
        })
      );

      setUsersData(newUsersData);
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
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <Card className="p-6">
        <div className="space-y-4">
          {usernames.map((username, index) => (
            <div key={index} className="flex gap-2">
              <Input
                placeholder="Enter LeetCode username"
                value={username}
                onChange={(e) => updateUsername(index, e.target.value)}
                className="flex-1"
              />
              {usernames.length > 1 && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeUsername(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
          
          {usernames.length < 5 && (
            <Button
              variant="outline"
              onClick={addUsername}
              className="w-full"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add User
            </Button>
          )}

          <Button
            onClick={fetchUserData}
            disabled={loading}
            className="w-full"
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Compare Users
          </Button>
        </div>
      </Card>

      {Object.keys(usersData).length > 0 && (
        <ComparisonTable usersData={usersData} />
      )}
    </div>
  );
}