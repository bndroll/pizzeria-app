export interface ICartSliceState {
	items: ICartItem[];
	totalPrice: number;
}

export interface ICartItem {
	id: number;
	title: string;
	imageUrl: string;
	type: string;
	size: number;
	price: number;
	count: number;
}