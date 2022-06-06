import { Status } from '../types';


export interface IUserSliceState {
	data: IUserState | null,
	isAuthorized: boolean,
	status: Status
	errorMessage: UserStateErrorMessages | null
}

export interface IUserState {
	id: number;
	username: string;
	email: string;
	role: string;
}

export interface IUserResponse {
	id: number;
	username: string;
	email: string;
	roles: string[];
}

export enum UserStateErrorMessages {
	REGISTER_ALREADY_EXIST = 'Ошибка регистрации, пользователь уже существует',
	LOGIN_BAD_REQUEST = 'Ошибка авторизации, неправильный логин или пароль',
	AUTH_NOT_FOUND = 'Ошибка аутентификации, текущий пользователь не авторизован'
}