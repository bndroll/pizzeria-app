import { ICartItem, ICartSliceState } from '../types';
import { calcTotalPrice } from './calc-total-price';


export const getCartFromLocalStorage = (): ICartSliceState => {
	const data = localStorage.getItem('cart');
	const items = data ? JSON.parse(data) : [];
	const totalPrice = calcTotalPrice(items);

	return {
		items: items as ICartItem[],
		totalPrice: totalPrice
	};
};
