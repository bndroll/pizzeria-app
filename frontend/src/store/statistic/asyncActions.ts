import { createAsyncThunk } from '@reduxjs/toolkit';
import { statisticAPI } from '../../services/api/statisticAPI';
import { IStatisticMostPopularPizzasResponse } from './types';


export const findMostPopularPizzas = createAsyncThunk<IStatisticMostPopularPizzasResponse[]>(
	'statistic/findMostPopularPizzas',
	async (): Promise<IStatisticMostPopularPizzasResponse[]> => {
		return await statisticAPI.findMostPopularPizzas();
	}
);

export const findMostOrderedPizzas = createAsyncThunk<IStatisticMostPopularPizzasResponse[]>(
	'statistic/findMostOrderedPizzas',
	async (): Promise<IStatisticMostPopularPizzasResponse[]> => {
		return await statisticAPI.findMostOrderedPizzas();
	}
);