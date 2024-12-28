"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface BackButtonProps {
  onBack: () => void;
}

export function BackButton({ onBack }: BackButtonProps) {
  return (
    <Button
      variant="ghost"
      size="sm"
      className="absolute top-4 left-4 flex items-center gap-2"
      onClick={onBack}
    >
      <ArrowLeft className="h-4 w-4" />
      Back
    </Button>
  );
}