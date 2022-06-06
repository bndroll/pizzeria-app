import axios from 'axios';
import { ICreatePizzaRequest, IPizzaResponse, IUpdatePizzaRequest } from '../../store/pizza/types';
import { ICategoryResponse } from '../../store/filter/types';


export const pizzaAPI = {
	async create(requestData: ICreatePizzaRequest): Promise<IPizzaResponse> {
		// form data

		const res = await axios.post(`${process.env.REACT_APP_PIZZA_SERVER_URL}/pizza`, {}, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`
			}
		});

		return res.data;
	},

	async findAll(): Promise<IPizzaResponse[]> {
		const res = await axios.get(`${process.env.REACT_APP_PIZZA_SERVER_URL}/pizza`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`
			}
		});

		return res.data;
	},

	async findById(id: number): Promise<IPizzaResponse> {
		const res = await axios.get(`${process.env.REACT_APP_PIZZA_SERVER_URL}/pizza/${id}`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`
			}
		});

		return res.data;
	},

	async findByTitle(title: string): Promise<IPizzaResponse[]> {
		const res = await axios.get(`${process.env.REACT_APP_PIZZA_SERVER_URL}/pizza/find?title=${title}`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`
			}
		});

		return res.data;
	},

	async findPizzaCategories(): Promise<ICategoryResponse[]> {
		const res = await axios.get(`${process.env.REACT_APP_PIZZA_SERVER_URL}/pizza/categories`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`
			}
		});

		return res.data;
	},

	async update(id: number, dto: IUpdatePizzaRequest): Promise<IPizzaResponse> {
		const res = await axios.patch(`${process.env.REACT_APP_PIZZA_SERVER_URL}/pizza/${id}`, dto, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`
			}
		});

		return res.data;
	},

	async updatePhoto(id: number, file: any): Promise<IPizzaResponse> {
		// form data

		const res = await axios.patch(`${process.env.REACT_APP_PIZZA_SERVER_URL}/pizza/${id}/photo`, {}, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`
			}
		});

		return res.data;
	},

	async updatePizzaGroupPhotoByTitle(title: string, file: any): Promise<IPizzaResponse> {
		// form data

		const res = await axios.patch(`${process.env.REACT_APP_PIZZA_SERVER_URL}/pizza/group-photo?title=${title}`, {}, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`
			}
		});

		return res.data;
	},

	async delete(id: number): Promise<IPizzaResponse> {
		const res = await axios.delete(`${process.env.REACT_APP_PIZZA_SERVER_URL}/pizza/${id}`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`
			}
		});

		return res.data;
	},

	async deleteByTitle(title: string): Promise<IPizzaResponse[]> {
		const res = await axios.delete(`${process.env.REACT_APP_PIZZA_SERVER_URL}/pizza?title=${title}`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`
			}
		});

		return res.data;
	}
};