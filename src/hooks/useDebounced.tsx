import { useRef, useEffect } from 'react';
import { debounce } from 'lodash';

/**
 * Custom hook that returns a debounced version of the provided callback function.
 * The debounced function will only be called after a specified delay has passed since the last invocation.
 *
 * @param callback - The callback function to be debounced.
 * @param delay - The delay in milliseconds before the debounced function is invoked.
 * @returns The debounced version of the callback function.
 */
export default function useDebounced(
  callback: (...args: any) => any,
  delay: number
) {
  const debouncedFn = useRef(debounce(callback, delay));
  useEffect(() => {
    debouncedFn.current = debounce(callback, delay);
  }, [callback, delay]);
  return debouncedFn.current;
}
