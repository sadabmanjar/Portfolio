import { useState, useEffect } from 'react';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export const useCountUp = (end, duration = 2) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const endNum = parseInt(end);
      if (start === endNum) return;

      let totalMiliseconds = duration * 1000;
      let incrementTime = totalMiliseconds / endNum;

      let timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start === endNum) clearInterval(timer);
      }, incrementTime);

      return () => clearInterval(timer);
    }
  }, [isInView, end, duration]);

  return { count, ref };
};
