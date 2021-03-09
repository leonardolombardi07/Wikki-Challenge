export enum ModalActionTypes {
  SHOW_MODAL = "SHOW_MODAL",
  HIDE_MODAL = "HIDE_MODAL",
}

export interface ModalActionPayload {
  modalType: ModalActionTypes;
}

export interface ModalAction {
  type: ModalActionTypes;
  payload?: any;
}
