import { RootState } from '../store';


export const selectPayStatus = (state: RootState) => state.pay.status;
export const selectPayErrorMessage = (state: RootState) => state.pay.errorMessage;