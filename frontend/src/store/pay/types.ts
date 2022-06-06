import { Status } from '../types';


export interface IPaySliceState {
	status: Status;
	errorMessage: PayStateErrorMessages | null;
}

export interface IPayByTerminalKey {
	cartNumber: string;
	person: string;
	secret: number;
	amount: number;
}

export enum PayStateErrorMessages {
	WRONG_INFO = 'Неверные данные владельца карты',
	LOW_MONEY = 'Недостаточно средств'
}
