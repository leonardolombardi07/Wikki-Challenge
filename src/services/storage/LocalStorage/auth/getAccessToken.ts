import { localStorageManager } from "../LocalStorageManager";
// Types
import { LocalStorageTypes } from "../types";

export const getAccessToken = (): string | null => {
  return localStorageManager.getItem(LocalStorageTypes.accessToken);
};
