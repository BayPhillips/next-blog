import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

type DateFormat = 'short' | 'medium' | 'long' | 'full' | 'iso'

export function formatDate(date: Date | string | number, format: DateFormat = 'medium'): string {
  const d = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date
  
  if (isNaN(d.getTime())) {
    return 'Invalid date'
  }

  const options: Intl.DateTimeFormatOptions = {}
  
  switch (format) {
    case 'short':
      options.year = 'numeric'
      options.month = 'short'
      options.day = 'numeric'
      break
    case 'medium':
      options.weekday = 'short'
      options.month = 'short'
      options.day = 'numeric'
      options.year = 'numeric'
      break
    case 'long':
      options.weekday = 'long'
      options.year = 'numeric'
      options.month = 'long'
      options.day = 'numeric'
      break
    case 'full':
      options.weekday = 'long'
      options.year = 'numeric'
      options.month = 'long'
      options.day = 'numeric'
      options.hour = '2-digit'
      options.minute = '2-digit'
      break
    case 'iso':
      return d.toISOString()
  }

  return d.toLocaleDateString(undefined, options)
}
