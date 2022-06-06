import axios from 'axios';
import { IUserResponse } from '../../store/user/types';


export const userAPI = {
	async findUserData(): Promise<IUserResponse> {
		const res = await axios.get(`${process.env.REACT_APP_PIZZA_SERVER_URL}/user/me`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`
			}
		});

		return res.data;
	}
};