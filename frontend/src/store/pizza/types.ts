import { Status } from '../types';


export interface IPizzaSliceState {
	items: IPizzaResponse[];
	pizzaViews: IPizzaView[];
	pizzaViewsByFilters: IPizzaView[];
	status: Status;
	errorMessage: string | null;
}

export interface ICreatePizzaRequest {
	file: File;
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
	id: number;
	price: number;
	rating: number;
}

export interface IUpdatePizzaGroupPhotoRequest {
	title: string;
	file: File;
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

export enum PizzaStateErrors {
	ALREADY_EXIST = "Пицца уже существует"
}