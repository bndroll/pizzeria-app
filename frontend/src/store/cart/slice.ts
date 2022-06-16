import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICartItem, ICartSliceState } from './types';
import { calcTotalPrice } from './utils/calc-total-price';
import { getCartFromCookies } from './utils/get-cart-from-cookies';
import { findUserData } from '../user/asyncActions';


// const initialState: ICartSliceState = getCartFromCookies();
const initialState: ICartSliceState = {
	items: [],
	totalPrice: 0
};

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
	},
	extraReducers: (builder) => {
		builder.addCase(findUserData.fulfilled, (state, action) => {
			const {items, totalPrice} = getCartFromCookies(action.payload.id);
			state.items = items;
			state.totalPrice = totalPrice;
		});
	}
});

export const {addItem, replaceItems, minusItem, removeItem, clearItems} = cartSlice.actions;
export default cartSlice.reducer;