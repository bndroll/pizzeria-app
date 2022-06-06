import { createAsyncThunk } from '@reduxjs/toolkit';
import { ILoginUser, ILoginUserResponse, IRegisterUser, IRegisterUserResponse } from './types';
import { authAPI } from '../../services/api/authAPI';


export const singUp = createAsyncThunk<IRegisterUserResponse, IRegisterUser>(
	'auth/singUp',
	async (registerUser: IRegisterUser) => {
		return await authAPI.register(registerUser);
	}
);

export const singIn = createAsyncThunk<ILoginUserResponse, ILoginUser>(
	'auth/singIn',
	async (loginUser: ILoginUser) => {
		return await authAPI.login(loginUser);
	}
);

export const singOut = createAsyncThunk(
	'auth/singOut',
	async () => {
		await authAPI.logout();
	}
);