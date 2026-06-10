import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isPresent(value?: string | null) {
  return Boolean(value && value.trim().length > 0);
}

export function hasItems<T>(items?: T[] | null): items is T[] {
  return Array.isArray(items) && items.length > 0;
}
