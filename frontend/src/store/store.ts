import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import user from './user/slice';
import pizza from './pizza/slice';
import filter from './filter/slice';
import cart from './cart/slice';
import pay from './pay/slice';
import pizzaOrders from './pizzaOrder/slice';
import statistic from './statistic/slice';


export const store = configureStore({
	reducer: {
		user,
		pizza,
		filter,
		cart,
		pay,
		pizzaOrders,
		statistic
	}
});

export type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();