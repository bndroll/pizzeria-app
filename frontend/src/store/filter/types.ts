export interface IFilterSliceState {
	searchValue: string;
	activeSortType: string | null;
	sortTypes: Sort[];
	activeCategory: string | null;
	categories: ICategoryResponse[];
}

export interface ICategoryResponse {
	category: string;
	rating: number;
	count: number;
}

export enum SortPropertyEnum {
	RATING_DESC = 'rating',
	RATING_ASC = '-rating',
	TITLE_DESC = 'title',
	TITLE_ASC = '-title',
	PRICE_DESC = 'price',
	PRICE_ASC = '-price',
}

export type Sort = {
	name: string;
	sortProperty: SortPropertyEnum;
};

export interface FilterSliceState {
	categoryId: number;
	sort: Sort;
}

export const sortTypes: Sort[] = [
	{name: 'по рейтингу ▲', sortProperty: SortPropertyEnum.RATING_DESC},
	{name: 'по рейтингу ▼', sortProperty: SortPropertyEnum.RATING_ASC},
	{name: 'по алфавиту ▲', sortProperty: SortPropertyEnum.TITLE_DESC},
	{name: 'по алфавиту ▼', sortProperty: SortPropertyEnum.TITLE_ASC},
	{name: 'по цене ▲', sortProperty: SortPropertyEnum.PRICE_DESC},
	{name: 'по цене ▼', sortProperty: SortPropertyEnum.PRICE_ASC}
];