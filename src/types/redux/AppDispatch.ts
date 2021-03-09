// Types
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../../redux/store";
import { AnyAction } from "redux";

export type AppDispatch = ThunkDispatch<RootState, any, AnyAction>;
