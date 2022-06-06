import { RootState } from '../store';


export const selectCategories = (state: RootState) => state.filter.categories.length === 0 ?
	[] : state.filter.categories.map(item => item.category);

export const selectTopCategory = (state: RootState) => state.filter.categories.length === 0 ?
	null : [...state.filter.categories].sort((a, b) => b.rating - a.rating)[0].category;

export const selectActiveCategory = (state: RootState) => state.filter.activeCategory;

export const selectSortTypes = (state: RootState) => state.filter.sortTypes.length === 0 ?
	[] : state.filter.sortTypes.map(item => item.name);

export const selectActiveSortType = (state: RootState) => state.filter.activeSortType === null ?
	state.filter.sortTypes[0].name : state.filter.activeSortType;

export const selectSearchValue = (state: RootState) => state.filter.searchValue;