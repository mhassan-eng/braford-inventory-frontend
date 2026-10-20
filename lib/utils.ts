import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function toNumber(value: unknown, fallback = 0): number {
  const num = typeof value === "number" ? value : Number(value)
  return Number.isFinite(num) ? num : fallback
}
