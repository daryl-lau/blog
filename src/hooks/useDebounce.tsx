/* eslint-disable @typescript-eslint/ban-types */
import { useRef } from 'react';

export interface UseDebounde {
  (func: Function, time: number): Function;
}

const useDebounce: UseDebounde = (func, time): Function => {
  // eslint-disable-next-line no-undef
  const timer = useRef<NodeJS.Timeout>();
  return function (...args: any) {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      func(...args);
    }, time);
  };
};

export default useDebounce;
