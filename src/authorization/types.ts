import { Ability } from "@casl/ability";

export type Actions = "manage" | "create" | "read" | "update" | "delete";
export type Subjects = "Product" | "Order" | "all";
export type AppAbilityType = Ability<[Actions, Subjects]>;
