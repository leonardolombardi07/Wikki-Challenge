import { localStorageManager } from "../LocalStorageManager";
// Types
import { LocalStorageTypes } from "../types";

export const isAuthenticated = (): boolean => {
  return Boolean(
    localStorageManager.getItem(LocalStorageTypes.accessToken)
  );
};
