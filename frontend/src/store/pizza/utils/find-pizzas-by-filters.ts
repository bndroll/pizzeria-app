import { IPizzaView, ISetPizzasByFilters } from '../types';
import { sortTypes } from '../../filter/types';


export const findPizzasByFilters = (items: IPizzaView[], filters: ISetPizzasByFilters): IPizzaView[] => {
	const sortField = sortTypes.find(item => item.name === filters.sortType)?.sortProperty.replace('-', '');
	const orderType = sortTypes.find(item => item.name === filters.sortType)?.sortProperty.includes('-');

	let newPizzas: IPizzaView[] = [...items];

	if (filters.category !== null) {
		newPizzas = newPizzas.filter(item => item.category === filters.category);
	}

	if (sortField === 'rating') {
		newPizzas = newPizzas.sort((a, b) => orderType ?
			a.rating - b.rating :
			b.rating - a.rating
		);
	} else if (sortField === 'title') {
		newPizzas = newPizzas.sort((a, b) => orderType ?
			(b.title.toLowerCase() >= a.title.toLowerCase() ? 1 : -1) :
			(a.title.toLowerCase() >= b.title.toLowerCase() ? 1 : -1)
		);
	} else if (sortField === 'price') {
		newPizzas = newPizzas.sort((a, b) => orderType ?
			a.price - b.price :
			b.price - a.price
		);
	}

	if (filters.searchText) {
		const findExpression = new RegExp(`${filters.searchText}`, 'i');
		newPizzas = newPizzas.filter(item => findExpression.test(item.title));
	}

	return newPizzas;
};