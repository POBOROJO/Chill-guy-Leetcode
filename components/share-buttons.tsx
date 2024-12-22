"use client";

import { Button } from "@/components/ui/button";
import { Share2, Download, Twitter } from "lucide-react";
import html2canvas from "html2canvas";
import { useToast } from "@/hooks/use-toast";

interface ShareButtonsProps {
  username: string;
  score: number;
}

export function ShareButtons({ username, score }: ShareButtonsProps) {
  const { toast } = useToast();

  const downloadImage = async () => {
    try {
      const element = document.getElementById('score-card');
      if (!element) return;

      const canvas = await html2canvas(element);
      const dataUrl = canvas.toDataURL('image/png');
      
      const link = document.createElement('a');
      link.download = `leetcode-chill-score-${username}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate image. Please try again.",
        variant: "destructive",
      });
    }
  };

  const shareOnTwitter = () => {
    const text = `Check out my LeetCode Chill Guy Score: ${score}%! How chill are you at coding? 😎 #LeetCode #ChillGuyScore`;
    const url = window.location.href;
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      '_blank'
    );
  };

  return (
    <div className="flex gap-4 justify-center mt-6">
      <Button onClick={downloadImage} variant="outline">
        <Download className="mr-2 h-4 w-4" />
        Download Image
      </Button>
      <Button onClick={shareOnTwitter} variant="outline">
        <Twitter className="mr-2 h-4 w-4" />
        Share on X
      </Button>
    </div>
  );
}