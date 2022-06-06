import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFilterSliceState, sortTypes } from './types';
import { findCategories } from './asyncActions';


const initialState: IFilterSliceState = {
	searchValue: '',
	categories: [],
	activeCategory: null,
	sortTypes: sortTypes,
	activeSortType: null
};

const filterSlice = createSlice({
	name: 'filter',
	initialState,
	reducers: {
		setActiveCategory(state, action: PayloadAction<string | null>) {
			state.activeCategory = action.payload;
		},
		setActiveSortType(state, action: PayloadAction<string>) {
			state.activeSortType = action.payload;
		},
		setSearchValue(state, action: PayloadAction<string>) {
			state.searchValue = action.payload;
		}
	},
	extraReducers: (builder) => {
		builder.addCase(findCategories.fulfilled, (state, action) => {
			state.activeCategory = null;
			state.searchValue = '';
			state.categories = action.payload.sort((a, b) => b.count - a.count).slice(0, 5);
		});
	}
});

export const {setActiveCategory, setActiveSortType, setSearchValue} = filterSlice.actions;
export default filterSlice.reducer;