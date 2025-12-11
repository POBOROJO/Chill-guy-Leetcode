"use client";

import { UserComparison } from "@/components/user-comparison";

export default function ComparePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-8">
          Compare LeetCode Profiles
        </h1>
        <p className="text-muted-foreground text-center mb-12">
          Compare up to 5 LeetCode profiles to see who&apos;s the chillest coder!
        </p>
        <UserComparison />
      </div>
    </main>
  );
}