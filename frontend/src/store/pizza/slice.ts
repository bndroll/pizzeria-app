import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPizzaSliceState, ISetPizzasByFilters, PizzaStateErrors } from './types';
import { createPizza, findAllPizzas, updatePizza, updatePizzaGroupPhoto } from './asyncActions';
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
		},

		resetPizzaStatus(state) {
			state.status = Status.NEVER;
			state.errorMessage = null;
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

		builder.addCase(createPizza.fulfilled, (state) => {
			state.status = Status.SUCCESS;
			state.errorMessage = null;
		});

		builder.addCase(createPizza.rejected, (state) => {
			state.status = Status.ERROR;
			state.errorMessage = PizzaStateErrors.ALREADY_EXIST;
		});

		builder.addCase(createPizza.pending, (state) => {
			state.status = Status.LOADING;
			state.errorMessage = null;
		});

		builder.addCase(updatePizza.fulfilled, (state, action) => {
			state.items = state.items.map(item => {
				if (item.id === action.payload.id) {
					return {
						...action.payload,
						imageUrl: `${process.env.REACT_APP_FILE_SYSTEM_SERVER_URL}${action.payload.imageUrl}`
					};
				}

				return item;
			});
			state.status = Status.SUCCESS;
			state.errorMessage = null;
		});

		builder.addCase(updatePizzaGroupPhoto.fulfilled, (state, action) => {
			state.items = state.items.map(item => {
				if (item.title === action.payload[0].title) {
					return {
						...item,
						imageUrl: `${process.env.REACT_APP_FILE_SYSTEM_SERVER_URL}${action.payload[0].imageUrl}`
					};
				}

				return item;
			});
			state.status = Status.SUCCESS;
			state.errorMessage = null;
		});
	}
});

export const {setItemsByFilters, resetPizzaStatus} = pizzaSlice.actions;
export default pizzaSlice.reducer;