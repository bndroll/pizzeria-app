import axios, { AxiosError } from 'axios';
import { IPayByTerminalKey, PayStateErrorMessages } from '../../store/pay/types';


export const payAPI = {
	async payByTerminalKey(data: IPayByTerminalKey): Promise<void> {
		try {
			const res = await axios.patch(`${process.env.REACT_APP_ONLINE_BANK_SERVER_URL}/card/throw-money/t-key`, {
				key: process.env.REACT_APP_APP_TERMINAL_KEY,
				cardNumber: data.cartNumber,
				person: data.person
					.toLowerCase()
					.split(' ')
					.map(item => item[0].toUpperCase() + item.slice(1))
					.join(' '),
				secret: Number(data.secret),
				amount: data.amount
			});

			return res.data;
		} catch (e: any) {
			if (e.response.data.message === 'Passing card is low of money')
				throw new AxiosError(PayStateErrorMessages.LOW_MONEY);

			throw new AxiosError(PayStateErrorMessages.WRONG_INFO);
		}
	}
};