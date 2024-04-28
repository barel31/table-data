import { useRef, useEffect } from 'react';
import { debounce } from 'lodash';

export default function useDebounced(callback: (...args: any) => any, delay: number) {
  const debouncedFn = useRef(debounce(callback, delay));
  useEffect(() => {
    debouncedFn.current = debounce(callback, delay);
  }, [callback, delay]);
  return debouncedFn.current;
}
