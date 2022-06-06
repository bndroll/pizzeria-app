import { createAsyncThunk } from '@reduxjs/toolkit';
import { ICreateOrder, ICreatePizzaOrderDetailsRequest, IPizzaOrderResponse } from './types';
import { pizzaOrderAPI } from '../../services/api/pizzaOrderAPI';


export const findOrders = createAsyncThunk<IPizzaOrderResponse[]>(
	'pizzaOrder/findOrders',
	async (): Promise<IPizzaOrderResponse[]> => {
		return await pizzaOrderAPI.findAll();
	}
);

export const crateOrder = createAsyncThunk<IPizzaOrderResponse, ICreateOrder>(
	'pizzaOrder/crateOrder',
	async (data: ICreateOrder): Promise<IPizzaOrderResponse> => {
		const orderItems: ICreatePizzaOrderDetailsRequest[] = [...data.items].map(item => {
			return {
				pizzaId: item.id,
				count: item.count
			};
		});

		return await pizzaOrderAPI.create({address: data.address, orderDetails: orderItems});
	}
);