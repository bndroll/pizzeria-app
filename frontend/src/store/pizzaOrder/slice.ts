import { createSlice } from '@reduxjs/toolkit';
import { IPizzaOrderSliceState } from './types';
import { crateOrder, findOrders } from './asyncActions';


const initialState: IPizzaOrderSliceState = {
	orders: []
};

const pizzaOrderSlice = createSlice({
	name: 'pizzaOrder',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(crateOrder.fulfilled, (state, action) => {
			state.orders.push(action.payload);
		});

		builder.addCase(findOrders.fulfilled, (state, action) => {
			state.orders = action.payload;
		});
	}
});

export default pizzaOrderSlice.reducer;