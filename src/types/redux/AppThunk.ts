// Types
import { ThunkAction } from "redux-thunk";
import { RootState } from "../../redux/store";
import { Action } from "redux";

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
