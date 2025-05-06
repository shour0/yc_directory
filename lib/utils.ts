import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import gsap from "gsap"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string) { 
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric", 
  });
}



import { ScrollTrigger } from "gsap/all"
gsap.registerPlugin(ScrollTrigger)


