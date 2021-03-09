// Hooks
import { useCallback } from "react";
import { useHistory } from "react-router-dom";
// Types
import { RoutePaths } from "../../types/routes";

export const useNavigation = () => {
  const history = useHistory();

  const navigateTo = useCallback(
    (path: RoutePaths, state?: any) => {
      history.push(path, state);
    },
    [history]
  );

  return { navigateTo };
};
