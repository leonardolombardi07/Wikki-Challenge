import { createContextualCan } from "@casl/react";
// Context
import { AbilityContext } from "../../context";

export const Can = createContextualCan(AbilityContext.Consumer);
