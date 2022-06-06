import { createSlice } from '@reduxjs/toolkit';
import { IUserSliceState, UserStateErrorMessages } from './types';
import { singIn, singOut, singUp } from '../auth/asyncActions';
import { findUserData } from './asyncActions';
import { Status } from '../types';


const initialState: IUserSliceState = {
	data: null,
	isAuthorized: false,
	status: Status.NEVER,
	errorMessage: null
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(singUp.fulfilled, (state, action) => {
			state.data = {
				id: action.payload.id,
				username: action.payload.username,
				email: action.payload.email,
				role: action.payload.roles[0]
			};

			state.isAuthorized = false;
			state.status = Status.SUCCESS;
			state.errorMessage = null;
		});

		builder.addCase(singUp.rejected, (state) => {
			state.data = null;
			state.isAuthorized = false;
			state.status = Status.ERROR;
			state.errorMessage = UserStateErrorMessages.REGISTER_ALREADY_EXIST;
		});

		builder.addCase(singUp.pending, (state) => {
			state.data = null;
			state.isAuthorized = false;
			state.status = Status.LOADING;
			state.errorMessage = null;
		});

		builder.addCase(singIn.fulfilled, (state) => {
			state.isAuthorized = true;
			state.status = Status.SUCCESS;
			state.errorMessage = null;
		});

		builder.addCase(singIn.rejected, (state) => {
			state.isAuthorized = false;
			state.status = Status.ERROR;
			state.errorMessage = UserStateErrorMessages.LOGIN_BAD_REQUEST;
		});

		builder.addCase(singIn.pending, (state) => {
			state.isAuthorized = false;
			state.status = Status.LOADING;
			state.errorMessage = null;
		});


		builder.addCase(singOut.fulfilled, (state) => {
			state.data = null;
			state.isAuthorized = false;
			state.status = Status.NEVER;
			state.errorMessage = null;
		});

		builder.addCase(findUserData.fulfilled, (state, action) => {
			state.data = {
				id: action.payload.id,
				username: action.payload.username,
				email: action.payload.email,
				role: action.payload.roles[0]
			};

			state.isAuthorized = true;
			state.status = Status.SUCCESS;
			state.errorMessage = null;
		});

		builder.addCase(findUserData.rejected, (state) => {
			state.data = null;
			state.isAuthorized = false;
			state.status = Status.ERROR;
		});
	}
});

export default userSlice.reducer;