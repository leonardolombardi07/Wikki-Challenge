import { useLocation } from "react-router-dom";
import { useEffect } from "react";
// Types
import { Location } from "history";

interface LocationChangeArgs {
  effect?: (location: Location) => any;
  cleanup?: (location: Location) => any;
}

export const useLocationChange = (actions: LocationChangeArgs) => {
  const location = useLocation();
  useEffect(() => {
    if (actions.effect) {
      actions.effect(location);
    }
    return () => {
      if (actions.cleanup) {
        actions.cleanup(location);
      }
    };
  }, [location, actions]);
};
