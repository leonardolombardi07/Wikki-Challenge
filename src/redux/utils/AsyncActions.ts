// Types
import { PayloadAction } from "@reduxjs/toolkit";
import { AsyncState, RequestStatus } from "../../types/redux";

export const handleStart = (state: AsyncState) => {
  state.status = RequestStatus.PENDING;
  state.error = null;
};

export const handleSuccess = (state: AsyncState) => {
  state.status = RequestStatus.FULFILLED;
  state.error = null;
};

export const handleError = (
  state: AsyncState,
  action: PayloadAction<string | undefined>
) => {
  state.status = RequestStatus.REJECTED;
  state.error = action.payload || "Algum erro ocorreu";
};

export const resetAsyncState = (state: AsyncState) => {
  state.status = RequestStatus.IDLE;
  state.error = null;
};
