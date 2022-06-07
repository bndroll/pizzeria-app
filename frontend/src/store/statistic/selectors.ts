import { RootState } from '../store';


export const selectMostPopularPizzas = (state: RootState) => state.statistic.mostPopularItems.slice(0, 4);
export const selectMostOrderedPizzas = (state: RootState) => state.statistic.mostOrderedItems.slice(0, 4);