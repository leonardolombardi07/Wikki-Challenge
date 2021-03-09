// Redux
import { useDispatch as useUntypedDispatch } from "react-redux";
// Types
import { AppDispatch } from "../../types/redux";

export const useDispatch = (): AppDispatch => useUntypedDispatch();
