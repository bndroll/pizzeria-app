import { RootState } from '../store';
import { ICartItem } from './types';


export const selectCart = (state: RootState) => {
	const {items, totalPrice} = state.cart;
	const totalCount: number = items.reduce((res: number, item: ICartItem) => res + item.count, 0);

	return {
		items,
		totalPrice,
		totalCount
	};
};

export const selectCartItems = (state: RootState) => state.cart.items;
export const selectCartTotalPrice = (state: RootState) => state.cart.totalPrice;

export const selectCartItemCount = (title: string) => (state: RootState) =>
	state.cart.items
		.filter(item => item.title === title)
		.reduce((res: number, item) => res + item.count, 0);