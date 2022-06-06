import axios from 'axios';
import { ILoginForm } from '../../components/Login/Login';
import { ILoginUserResponse, IRegisterUser, IRegisterUserResponse } from '../../store/auth/types';


export const authAPI = {
	async register(requestData: IRegisterUser): Promise<IRegisterUserResponse> {
		const res = await axios.post(`${process.env.REACT_APP_PIZZA_SERVER_URL}/auth/register`, {
			username: requestData.username,
			email: requestData.email,
			password: requestData.password,
			roles: ['user']
		});

		return res.data;
	},

	async login(requestData: ILoginForm): Promise<ILoginUserResponse> {
		const res = await axios.post(`${process.env.REACT_APP_PIZZA_SERVER_URL}/auth/login`, {
			username: requestData.username,
			password: requestData.password
		});

		localStorage.setItem('token', res.data.accessToken);

		return res.data;
	},

	async logout(): Promise<void> {
		localStorage.removeItem('token');
	}
};