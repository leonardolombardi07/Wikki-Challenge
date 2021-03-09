// Hooks
import { useCallback } from "react";
import { useLocation } from "react-router-dom";
// Types
import { RoutePaths } from "../../types/routes";

export const useIsInCurrentPath = () => {
  const { pathname: currentPath } = useLocation();

  const isInCurrentPath = useCallback(
    (path: RoutePaths) => path === currentPath,
    [currentPath]
  );

  return { isInCurrentPath };
};
