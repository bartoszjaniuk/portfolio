import { useEffect, useRef, useState } from "react";

const DEFAULT_ROOT_MARGIN = "400px";

type UseNearViewportOptions = {
  rootMargin?: string;
  enabled?: boolean;
};

export const useNearViewport = <T extends Element>({
  rootMargin = DEFAULT_ROOT_MARGIN,
  enabled = true,
}: UseNearViewportOptions = {}) => {
  const ref = useRef<T | null>(null);
  const [isNear, setIsNear] = useState(false);

  useEffect(() => {
    if (isNear || !enabled) {
      return;
    }

    const node = ref.current;
    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsNear(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [enabled, isNear, rootMargin]);

  return { ref, isNear };
};
