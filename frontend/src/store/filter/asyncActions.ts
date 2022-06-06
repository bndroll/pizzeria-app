import { createAsyncThunk } from '@reduxjs/toolkit';
import { pizzaAPI } from '../../services/api/pizzaAPI';
import { ICategoryResponse } from './types';


export const findCategories = createAsyncThunk<ICategoryResponse[]>(
	'pizza/findCategories',
	async (): Promise<ICategoryResponse[]> => {
		return await pizzaAPI.findPizzaCategories();
	}
);