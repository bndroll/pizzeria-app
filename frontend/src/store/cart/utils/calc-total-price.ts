import { ICartItem } from '../types';


export const calcTotalPrice = (items: ICartItem[]): number => {
	return items.reduce((sum, cartItem) => cartItem.price * cartItem.count + sum, 0);
};