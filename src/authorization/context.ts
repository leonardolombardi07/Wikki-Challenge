import { createContext } from "react";
// Types
import { AppAbilityType } from "./types";

export const AbilityContext = createContext<AppAbilityType>(
  (null as unknown) as AppAbilityType
);
