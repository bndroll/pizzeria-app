import { createSlice } from '@reduxjs/toolkit';
import { Status } from '../types';
import { IStatisticSliceState } from './types';
import { findMostOrderedPizzas, findMostPopularPizzas } from './asyncActions';


const initialState: IStatisticSliceState = {
	mostPopularItems: [],
	mostOrderedItems: [],
	status: Status.NEVER,
	errorMessage: null
};

const statisticSlice = createSlice({
	name: 'statistic',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(findMostPopularPizzas.fulfilled, (state, action) => {
			state.mostPopularItems = action.payload.map(item => ({
				...item,
				image: `${process.env.REACT_APP_FILE_SYSTEM_SERVER_URL}${item.image}`
			}));
			state.status = Status.SUCCESS;
		});

		builder.addCase(findMostPopularPizzas.rejected, (state) => {
			state.mostPopularItems = [];
			state.status = Status.ERROR;
		});

		builder.addCase(findMostPopularPizzas.pending, (state) => {
			state.status = Status.LOADING;
		});

		builder.addCase(findMostOrderedPizzas.fulfilled, (state, action) => {
			state.mostOrderedItems = action.payload.map(item => ({
				...item,
				image: `${process.env.REACT_APP_FILE_SYSTEM_SERVER_URL}${item.image}`
			}));
			state.status = Status.SUCCESS;
		});

		builder.addCase(findMostOrderedPizzas.rejected, (state) => {
			state.mostOrderedItems = [];
			state.status = Status.ERROR;
		});

		builder.addCase(findMostOrderedPizzas.pending, (state) => {
			state.status = Status.LOADING;
		});
	}
});

export default statisticSlice.reducer;