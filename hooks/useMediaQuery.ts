import { useCallback, useSyncExternalStore } from "react";

export const useMediaQuery = (query?: string) => {
  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      if (!query) {
        return () => {};
      }

      const mediaQueryList = window.matchMedia(query);
      mediaQueryList.addEventListener("change", onStoreChange);
      return () => mediaQueryList.removeEventListener("change", onStoreChange);
    },
    [query],
  );

  const getSnapshot = useCallback(() => {
    if (!query) {
      return true;
    }

    return window.matchMedia(query).matches;
  }, [query]);

  const getServerSnapshot = useCallback(() => {
    if (!query) {
      return true;
    }

    return false;
  }, [query]);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
};
