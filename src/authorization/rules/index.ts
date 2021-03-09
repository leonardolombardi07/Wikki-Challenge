import { AbilityBuilder, Ability, AbilityClass } from "@casl/ability";
// Types
import { AppAbilityType } from "../types";

export const AppAbility = Ability as AbilityClass<AppAbilityType>;

function defineRulesFor(isAuthenticated: boolean) {
  const { can, cannot, rules } = new AbilityBuilder(AppAbility);
  if (isAuthenticated) {
    can("manage", "all");
  } else {
    cannot(["create", "delete", "update"], "Product");
  }
  return rules;
}

export function buildAbility(isAuthenticated: boolean): AppAbilityType {
  return new AppAbility(defineRulesFor(isAuthenticated), {
    // https://casl.js.org/v5/en/guide/subject-type-detection
    detectSubjectType: (object) => object!,
  });
}
