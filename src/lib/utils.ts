import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Utility to merge class names with Tailwind CSS support
 * @param inputs - class names to merge
 * @returns Merged class names
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Utility to handle async/await errors without try/catch
 * @param promise - The promise to handle
 * @returns An object containing either the resolved data or the error
 */
export async function unwrapPromise<T>(
  promise: Promise<T>
): Promise<{ error: Error | null; data: T | null }> {
  try {
    const data = await promise;
    return { error: null, data };
  } catch (error) {
    return { error: error as Error, data: null };
  }
}
