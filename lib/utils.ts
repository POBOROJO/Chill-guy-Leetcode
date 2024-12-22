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
  if (process.env.NODE_ENV === 'development') {
    return path;
  }
  
  // In production, use the full URL
  return new URL(path, window.location.origin).toString();
}