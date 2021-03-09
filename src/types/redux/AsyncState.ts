import { RequestStatus } from "./RequestStatus";

export interface AsyncState {
  status: RequestStatus;
  error: null | string;
}
