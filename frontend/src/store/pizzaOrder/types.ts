import { IPizzaResponse } from '../pizza/types';
import { ICartItem } from '../cart/types';

export interface IPizzaOrderSliceState {
	orders: IPizzaOrderResponse[]
}

export interface ICreateOrder {
	items: ICartItem[];
	address: string;
}

export interface ICreatePizzaOrderRequest {
	orderDetails: ICreatePizzaOrderDetailsRequest[];
	address: string;
}

export interface ICreatePizzaOrderDetailsRequest {
	pizzaId: number;
	count: number;
}

export interface IPizzaOrderResponse {
	id: number;
	orderDetails: IPizzaOrderDetailsResponse[];
	address: string;
}

export interface IPizzaOrderDetailsResponse {
	id: number;
	pizza: IPizzaResponse;
	count: number;
}
