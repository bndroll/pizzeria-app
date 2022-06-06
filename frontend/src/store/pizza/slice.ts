import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPizzaSliceState, ISetPizzasByFilters } from './types';
import { findAllPizzas } from './asyncActions';
import { Status } from '../types';
import { castPizzaItemsToPizzaViews } from './utils/cast-pizza-items-to-views';
import { findPizzasByFilters } from './utils/find-pizzas-by-filters';


const initialState: IPizzaSliceState = {
	items: [],
	pizzaViews: [],
	pizzaViewsByFilters: [],
	status: Status.NEVER,
	errorMessage: null
};

const pizzaSlice = createSlice({
	name: 'pizza',
	initialState,
	reducers: {
		setItemsByFilters(state, action: PayloadAction<ISetPizzasByFilters>) {
			state.pizzaViewsByFilters = findPizzasByFilters([...state.pizzaViews], action.payload);
			state.status = Status.SUCCESS;
		}
	},
	extraReducers: (builder) => {
		builder.addCase(findAllPizzas.fulfilled, (state, action) => {
			state.items = action.payload.map(item => ({
				...item,
				imageUrl: `${process.env.REACT_APP_FILE_SYSTEM_SERVER_URL}${item.imageUrl}`
			}));
			state.pizzaViews = castPizzaItemsToPizzaViews([...state.items]);
			state.pizzaViewsByFilters = state.pizzaViews;
			state.status = Status.SUCCESS;
		});

		builder.addCase(findAllPizzas.rejected, (state) => {
			state.items = [];
			state.pizzaViews = [];
			state.pizzaViewsByFilters = [];
			state.status = Status.ERROR;
		});

		builder.addCase(findAllPizzas.pending, (state) => {
			state.status = Status.LOADING;
		});
	}
});

export const {setItemsByFilters} = pizzaSlice.actions;
export default pizzaSlice.reducer;