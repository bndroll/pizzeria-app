import { RootState } from '../store';


export const selectPizzaOrders = (state: RootState) => state.pizzaOrders.orders;