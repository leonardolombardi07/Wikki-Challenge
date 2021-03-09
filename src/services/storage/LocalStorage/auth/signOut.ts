import { localStorageManager } from "../LocalStorageManager";
import { LocalStorageTypes } from "../types";

export const signOut = () => {
  localStorageManager.removeItem(LocalStorageTypes.accessToken);
  localStorageManager.removeItem(LocalStorageTypes.refreshToken);
};
