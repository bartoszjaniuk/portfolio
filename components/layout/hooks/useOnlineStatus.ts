"use client";

import { useSyncExternalStore } from "react";

const getOnlineStatusSnapshot = () => navigator.onLine;

const subscribeToOnlineStatusListener = (callback: () => void) => {
  window.addEventListener("online", callback);
  window.addEventListener("offline", callback);
  return () => {
    window.removeEventListener("online", callback);
    window.removeEventListener("offline", callback);
  };
};

export const useOnlineStatus = () => {
  return useSyncExternalStore(
    subscribeToOnlineStatusListener,
    getOnlineStatusSnapshot,
    () => true,
  );
};
