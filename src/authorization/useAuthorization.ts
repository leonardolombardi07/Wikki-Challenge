// Hooks
import { useAbility } from "@casl/react";
// Context
import { AbilityContext } from "./context";

export const useAuthorization = () => useAbility(AbilityContext);
