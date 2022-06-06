import { createSlice } from '@reduxjs/toolkit';
import { IPaySliceState, PayStateErrorMessages } from './types';
import { payByTerminalKey } from './asyncActions';
import { Status } from '../types';


const initialState: IPaySliceState = {
	status: Status.NEVER,
	errorMessage: null
};

const paySlice = createSlice({
	name: 'pay',
	initialState,
	reducers: {
		clearPayState(state) {
			state.status = Status.NEVER;
			state.errorMessage = null;
		}
	},
	extraReducers: (builder) => {
		builder.addCase(payByTerminalKey.fulfilled, (state) => {
			state.status = Status.SUCCESS;
			state.errorMessage = null;
		});

		builder.addCase(payByTerminalKey.pending, (state) => {
			state.status = Status.LOADING;
			state.errorMessage = null;
		});

		builder.addCase(payByTerminalKey.rejected, (state, action) => {
			state.status = Status.ERROR;
			state.errorMessage = action.error.message as PayStateErrorMessages;
		});
	}
});

export const {clearPayState} = paySlice.actions;
export default paySlice.reducer;