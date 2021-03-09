import React, { useMemo } from "react";
// Hooks
import { useSelector } from "../../../redux";
// Ability
import { AbilityContext } from "../../context";
import { buildAbility } from "../../rules";
// Redux
import { selectIsAuthenticated } from "../../../redux/auth";

const useUpdatedAbility = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  return useMemo(() => buildAbility(isAuthenticated), [isAuthenticated]);
};

export const AuthorizationProvider: React.FC = ({ children }) => {
  const memoizedAbility = useUpdatedAbility();
  return (
    <AbilityContext.Provider value={memoizedAbility}>
      {children}
    </AbilityContext.Provider>
  );
};
