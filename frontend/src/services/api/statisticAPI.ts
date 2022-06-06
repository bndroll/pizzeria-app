import axios from 'axios';
import { IStatisticMostPopularPizzasResponse } from '../../store/statistic/types';


export const statisticAPI = {
	async findMostPopularPizzas(): Promise<IStatisticMostPopularPizzasResponse[]> {
		const res = await axios.get(`${process.env.REACT_APP_PIZZA_SERVER_URL}/admin/most-popular`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`
			}
		});

		return res.data;
	},

	async findMostOrderedPizzas(): Promise<IStatisticMostPopularPizzasResponse[]> {
		const res = await axios.get(`${process.env.REACT_APP_PIZZA_SERVER_URL}/admin/most-ordered`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`
			}
		});

		return res.data;
	}
};