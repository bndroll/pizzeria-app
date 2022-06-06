import { createAsyncThunk } from '@reduxjs/toolkit';
import { IPizzaResponse } from './types';
import { pizzaAPI } from '../../services/api/pizzaAPI';


export const findAllPizzas = createAsyncThunk<IPizzaResponse[]>(
	'pizza/findAll',
	async (): Promise<IPizzaResponse[]> => {
		return await pizzaAPI.findAll();
	}
);