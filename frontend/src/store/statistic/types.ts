import { Status } from '../types';


export interface IStatisticSliceState {
	mostPopularItems: IStatisticMostPopularPizzasResponse[];
	mostOrderedItems: IStatisticMostPopularPizzasResponse[];
	status: Status;
	errorMessage: string | null;
}

export interface IStatisticMostPopularPizzasResponse {
	id: number;
	title: string;
	image: string;
	size: number;
	type: string;
	category: string;
	price: number;
	rating: number;
	ordersCount: number;
}