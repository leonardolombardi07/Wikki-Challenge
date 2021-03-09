import { localStorageManager } from "../LocalStorageManager";
// Types
import { LocalStorageTypes } from "../types";

interface SignInStorage {
  accessToken: string;
  refreshToken: string;
}

export const signIn = ({ accessToken, refreshToken }: SignInStorage) => {
  localStorageManager.setItem(LocalStorageTypes.accessToken, accessToken);
  localStorageManager.setItem(
    LocalStorageTypes.refreshToken,
    refreshToken
  );
};
