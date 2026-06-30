import { useSyncExternalStore } from "react";

// 1. Define getSnapshot outside the component:
// It reads the current state from the external source.
const getOnlineStatusSnapshot = () => navigator.onLine;

// 2. Define subscribe outside the component:
// It sets up listeners and calls the React-provided callback on change.
const subscribeToOnlineStatusListener = (callback: () => void) => {
  window.addEventListener("online", callback);
  window.addEventListener("offline", callback);
  // Return the cleanup function
  return () => {
    window.removeEventListener("online", callback);
    window.removeEventListener("offline", callback);
  };
};

// 3. Create the custom hook
export const useOnlineStatus = () => {
  // useSyncExternalStore ensures synchronous reads and tearing prevention
  const isOnline = useSyncExternalStore(
    subscribeToOnlineStatusListener,
    getOnlineStatusSnapshot,
    // For a robust SSR scenario, you should provide getServerSnapshot:
    () => true, // Assuming client is 'online' or a sensible default
  );
  return isOnline;
};
