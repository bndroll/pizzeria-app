import { IPizzaResponse, IPizzaView } from '../types';


export const castPizzaItemsToPizzaViews = (items: IPizzaResponse[]): IPizzaView[] => {
	const result: IPizzaView[] = [];
	const pizzas = items.sort((a, b) => a.title >= b.title ? 1 : -1);

	for (let i = 0; i < pizzas.length; i++) {
		let currentPizzasCount: number = 1;
		let currentRatingSum: number = pizzas[i].rating;
		let currentPriceSum: number = pizzas[i].price;

		const newItem: IPizzaView = {
			title: pizzas[i].title,
			imageUrl: pizzas[i].imageUrl,
			size: [pizzas[i].size],
			type: [pizzas[i].type],
			category: pizzas[i].category,
			rating: 0,
			price: 0
		};

		for (; pizzas[i + 1] && pizzas[i].title === pizzas[i + 1].title; i++) {
			currentPizzasCount++;
			newItem.size.push(pizzas[i + 1].size);
			newItem.type.push(pizzas[i + 1].type);
			currentRatingSum += pizzas[i + 1].rating;
			currentPriceSum += pizzas[i + 1].price;
		}

		newItem.size = Array.from(new Set(newItem.size)).sort((a, b) => a - b);
		newItem.type = Array.from(new Set(newItem.type)).sort((a, b) => b > a ? 1 : -1);
		newItem.rating = currentRatingSum / currentPizzasCount;
		newItem.price = currentPriceSum / currentPizzasCount;

		result.push(newItem);
	}

	return result;
};