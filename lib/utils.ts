import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
  }).format(date);
}

export function getImageUrl(path: string): string {
  // In development, use the public directory
  if (typeof window === 'undefined') {
    return path;
  }
  
  return process.env.NODE_ENV === 'development' 
    ? path 
    : new URL(path, window.location.origin).toString();
}