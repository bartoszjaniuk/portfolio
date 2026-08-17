import { useSyncExternalStore } from "react";

type NetworkInformationConnection = {
  saveData: boolean;
  addEventListener: (type: "change", listener: () => void) => void;
  removeEventListener: (type: "change", listener: () => void) => void;
};

type NavigatorWithConnection = Navigator & {
  connection?: NetworkInformationConnection;
};

const getConnection = (): NetworkInformationConnection | undefined =>
  (navigator as NavigatorWithConnection).connection;

const subscribeToSaveData = (onStoreChange: () => void) => {
  const connection = getConnection();
  if (!connection?.addEventListener) {
    return () => {};
  }

  connection.addEventListener("change", onStoreChange);
  return () => connection.removeEventListener("change", onStoreChange);
};

const getSaveDataSnapshot = () => getConnection()?.saveData ?? false;

const getSaveDataServerSnapshot = () => false;

export const useSaveData = () =>
  useSyncExternalStore(
    subscribeToSaveData,
    getSaveDataSnapshot,
    getSaveDataServerSnapshot,
  );
