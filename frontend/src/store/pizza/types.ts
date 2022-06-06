import { Status } from '../types';


export interface IPizzaSliceState {
	items: IPizzaResponse[];
	pizzaViews: IPizzaView[];
	pizzaViewsByFilters: IPizzaView[];
	status: Status;
	errorMessage: string | null;
}

export interface ICreatePizzaRequest {
	file: any;
	title: string;
	type: string;
	size: number;
	category: string;
	price: number;
	rating: number;
}

export interface IPizzaResponse {
	id: number;
	title: string;
	imageUrl: string;
	type: string;
	size: number;
	category: string;
	price: number;
	rating: number;
}

export interface IUpdatePizzaRequest {
	price: number;
	rating: number;
}

export interface ISetPizzasByFilters {
	category: string | null;
	sortType: string;
	searchText: string | null;
}

export interface IFindPizzaPrice {
	title: string;
	type: string;
	size: number;
}

export interface IPizzaView {
	title: string;
	imageUrl: string;
	type: string[];
	size: number[];
	category: string;
	rating: number;
	price: number;
}