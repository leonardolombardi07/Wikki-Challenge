import { LocalStorageTypes } from "./types";

class LocalStorageManager {
  getItem(item: LocalStorageTypes) {
    return localStorage.getItem(item);
  }

  setItem(item: LocalStorageTypes, value: string) {
    localStorage.setItem(item, value);
  }

  removeItem(item: LocalStorageTypes) {
    localStorage.removeItem(item);
  }
}

export const localStorageManager = new LocalStorageManager();
