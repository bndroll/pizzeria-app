import axios from 'axios';
import { IStatisticMostPopularPizzasResponse } from '../../store/statistic/types';
import cookies from 'js-cookie';


export const statisticAPI = {
	async findMostPopularPizzas(): Promise<IStatisticMostPopularPizzasResponse[]> {
		const res = await axios.get(`${process.env.REACT_APP_PIZZA_SERVER_URL}/admin/most-popular`, {
			headers: {
				Authorization: `Bearer ${cookies.get('token')}`
			}
		});

		return res.data;
	},

	async findMostOrderedPizzas(): Promise<IStatisticMostPopularPizzasResponse[]> {
		const res = await axios.get(`${process.env.REACT_APP_PIZZA_SERVER_URL}/admin/most-ordered`, {
			headers: {
				Authorization: `Bearer ${cookies.get('token')}`
			}
		});

		return res.data;
	}
};