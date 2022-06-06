export interface IRegisterUser {
	username: string;
	email: string;
	password: string;
	roles: string[];
}

export interface ILoginUser {
	username: string;
	password: string;
}

export interface IRegisterUserResponse {
	id: number;
	username: string;
	email: string;
	roles: string[];
}

export interface ILoginUserResponse {
	accessToken: string;
}

