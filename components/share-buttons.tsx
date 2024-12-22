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

      const canvas = await html2canvas(element, {
        backgroundColor: '#ffffff',
        removeContainer: true,
        scale: 2,
        width: element.offsetWidth,
        height: element.offsetHeight
      });
      const dataUrl = canvas.toDataURL('image/png',1.0);
      
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
    if (typeof window !== 'undefined') {
      const text = `Check out my LeetCode Chill Guy Score: ${score}%! How chill are you at coding? 😎 #LeetCode #ChillGuyScore`;
      const url = window.location.href;
      window.open(
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
        '_blank'
      );
    }
  };
  const followOnTwitter = () => {
    if (typeof window !== 'undefined') {
      window.open('https://twitter.com/intent/follow?screen_name=poborojo', '_blank');
    }
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex flex-wrap justify-center gap-4">
        <Button onClick={downloadImage} variant="outline" className="min-w-[200px]">
          <Download className="mr-2 h-4 w-4" />
          Download Image
        </Button>
        <Button onClick={shareOnTwitter} variant="outline" className="min-w-[200px]">
          <Twitter className="mr-2 h-4 w-4" />
          Share on X
        </Button>
        <Button onClick={followOnTwitter} variant="outline" className="min-w-[200px]">
          <Twitter className="mr-2 h-4 w-4" />
          Follow me On Twitter
        </Button>
      </div>
    </div>
  );
}