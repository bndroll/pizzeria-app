import { createAsyncThunk } from '@reduxjs/toolkit';
import { userAPI } from '../../services/api/userAPI';
import { IUserResponse } from './types';


export const findUserData = createAsyncThunk<IUserResponse>(
	'user/findMe',
	async (): Promise<IUserResponse> => {
		return await userAPI.findUserData();
	}
);