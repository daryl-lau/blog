/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import { useRef } from 'react';

export interface UseThrottle {
  (func: Function, time: number): Function;
}

const useThrottle: UseThrottle = (func, time): Function => {
  // eslint-disable-next-line no-undef
  const timer = useRef<NodeJS.Timeout>();
  // eslint-disable-next-line func-names
  return function (...args: any) {
    if (!timer.current) {
      timer.current = setTimeout(() => {
        timer.current = undefined;
        func(...args);
      }, time);
    }
  };
};

export default useThrottle;
