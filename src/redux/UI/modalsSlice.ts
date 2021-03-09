import { createSlice } from "@reduxjs/toolkit";
// Types
import { PayloadAction } from "@reduxjs/toolkit";
import { ModalTypeEnum } from "../../types/redux";
import { RootState } from "../store";

interface ModalActionPayload {
  modalType: ModalTypeEnum;
}

interface ModalsState {
  openedModals: ModalTypeEnum[];
}

const initialState: ModalsState = {
  openedModals: [],
};

const modalsSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    openModal(state, action: PayloadAction<ModalActionPayload>) {
      state.openedModals.push(action.payload.modalType);
    },
    hideModal(state, action: PayloadAction<ModalActionPayload>) {
      state.openedModals = state.openedModals.filter(
        (modalType) => modalType !== action.payload.modalType
      );
    },
  },
});

export const isModalOpen = (state: RootState, modalType: ModalTypeEnum) =>
  state.modals.openedModals.includes(modalType);

export const { openModal, hideModal } = modalsSlice.actions;
export const modalsReducer = modalsSlice.reducer;
