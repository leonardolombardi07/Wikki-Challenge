// Redux
import { useSelector as useUntypedSelector } from "react-redux";
// Types
import { TypedUseSelectorHook } from "react-redux";
import { RootState } from "../store";

export const useSelector: TypedUseSelectorHook<RootState> = useUntypedSelector;
