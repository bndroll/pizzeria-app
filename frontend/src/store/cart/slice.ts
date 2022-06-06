import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICartItem, ICartSliceState } from './types';
import { getCartFromLocalStorage } from './utils/get-cart-from-local-storage';
import { calcTotalPrice } from './utils/calc-total-price';


const initialState: ICartSliceState = getCartFromLocalStorage();

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addItem(state, action: PayloadAction<ICartItem>) {
			const findItem = state.items.find(item => item.id === action.payload.id);

			if (findItem)
				findItem.count++;
			else
				state.items.push({...action.payload, count: 1});

			state.totalPrice = calcTotalPrice(state.items);
		},

		replaceItems(state, action: PayloadAction<ICartItem[]>) {
			state.items = action.payload;
			state.totalPrice = calcTotalPrice(state.items);
		},

		minusItem(state, action: PayloadAction<number>) {
			const findItem = state.items.find(item => item.id === action.payload);

			if (findItem)
				findItem.count--;

			state.totalPrice = calcTotalPrice(state.items);
		},

		removeItem(state, action: PayloadAction<number>) {
			state.items = state.items.filter(item => item.id !== action.payload);
			state.totalPrice = calcTotalPrice(state.items);
		},

		clearItems(state) {
			state.items = [];
			state.totalPrice = 0;
		}
	}
});

export const {addItem, replaceItems, minusItem, removeItem, clearItems} = cartSlice.actions;
export default cartSlice.reducer;