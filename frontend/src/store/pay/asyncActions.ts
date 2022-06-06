import { createAsyncThunk } from '@reduxjs/toolkit';
import { IPayByTerminalKey } from './types';
import { payAPI } from '../../services/api/payAPI';


export const payByTerminalKey = createAsyncThunk(
	'pay/payByTerminalKey',
	async (data: IPayByTerminalKey) => {
		return await payAPI.payByTerminalKey(data);
	}
);
