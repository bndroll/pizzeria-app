import { createAsyncThunk } from '@reduxjs/toolkit';
import { ICreatePizzaRequest, IPizzaResponse, IUpdatePizzaGroupPhotoRequest, IUpdatePizzaRequest } from './types';
import { pizzaAPI } from '../../services/api/pizzaAPI';


export const findAllPizzas = createAsyncThunk<IPizzaResponse[]>(
	'pizza/findAll',
	async (): Promise<IPizzaResponse[]> => {
		return await pizzaAPI.findAll();
	}
);

export const createPizza = createAsyncThunk<IPizzaResponse, ICreatePizzaRequest>(
	'pizza/create',
	async (data: ICreatePizzaRequest): Promise<IPizzaResponse> => {
		return await pizzaAPI.create(data);
	}
);

export const updatePizza = createAsyncThunk<IPizzaResponse, IUpdatePizzaRequest>(
	'pizza/update',
	async (dto: IUpdatePizzaRequest): Promise<IPizzaResponse> => {
		return await pizzaAPI.update(dto);
	}
);

export const updatePizzaGroupPhoto = createAsyncThunk<IPizzaResponse[], IUpdatePizzaGroupPhotoRequest>(
	'pizza/updateGroupPhoto',
	async (dto: IUpdatePizzaGroupPhotoRequest): Promise<IPizzaResponse[]> => {
		return await pizzaAPI.updatePizzaGroupPhotoByTitle(dto);
	}
);

export const deletePizzaById = createAsyncThunk<IPizzaResponse, number>(
	'pizza/deleteById',
	async (id: number): Promise<IPizzaResponse> => {
		return await pizzaAPI.delete(id);
	}
);

export const deletePizzaByTitle = createAsyncThunk<IPizzaResponse[], string>(
	'pizza/deleteByTitle',
	async (title: string): Promise<IPizzaResponse[]> => {
		return await pizzaAPI.deleteByTitle(title);
	}
);