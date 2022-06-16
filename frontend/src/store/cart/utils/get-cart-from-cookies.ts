import { ICartItem, ICartSliceState } from '../types';
import { calcTotalPrice } from './calc-total-price';
import cookies from 'js-cookie';


export const getCartFromCookies = (userId: number): ICartSliceState => {
	const data = cookies.get(`cart_${userId}`);
	const items = data ? JSON.parse(data) : [];
	const totalPrice = calcTotalPrice(items);

	return {
		items: items as ICartItem[],
		totalPrice: totalPrice
	};
};
