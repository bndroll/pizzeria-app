import axios from 'axios';
import {
	ICreatePizzaRequest,
	IPizzaResponse,
	IUpdatePizzaGroupPhotoRequest,
	IUpdatePizzaRequest
} from '../../store/pizza/types';
import { ICategoryResponse } from '../../store/filter/types';


export const pizzaAPI = {
	async create(requestData: ICreatePizzaRequest): Promise<IPizzaResponse> {
		const formData = new FormData();

		formData.append('file', requestData.file);
		formData.append('title', requestData.title);
		formData.append('type', requestData.type);
		formData.append('size', String(requestData.size));
		formData.append('category', requestData.category);
		formData.append('price', String(requestData.price));
		formData.append('rating', String(requestData.rating));

		const res = await axios.post(`${process.env.REACT_APP_PIZZA_SERVER_URL}/pizza`, formData, {
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

	async update(dto: IUpdatePizzaRequest): Promise<IPizzaResponse> {
		const res = await axios.patch(`${process.env.REACT_APP_PIZZA_SERVER_URL}/pizza/${dto.id}`,
			{
				price: dto.price,
				rating: dto.rating
			}, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem('token')}`
				}
			});

		return res.data;
	},

	async updatePizzaGroupPhotoByTitle(dto: IUpdatePizzaGroupPhotoRequest): Promise<IPizzaResponse[]> {
		const formData = new FormData();

		formData.append('file', dto.file);

		const res = await axios.patch(`${process.env.REACT_APP_PIZZA_SERVER_URL}/pizza/group-photo?title=${dto.title}`, formData, {
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