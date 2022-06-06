import React, { ChangeEvent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import debounce from 'lodash.debounce';
import styles from './PayForm.module.scss';


export interface IPayForm {
	number: string;
	person: string;
	secret: number;
	address: string;
}

const yupSchema = yup.object({
	number: yup.string().required('Введите номер карты'),
	person: yup.string().required('Введите имя владельца карты'),
	secret: yup.string().length(3).required('Введите cvc код'),
	address: yup.string().required('Введите адресс код')
});

interface IPayFormProps {
	amount: number;
	submitPayHandler: (data: IPayForm, amount: number) => void;
	setShowErrorMessage: (param: boolean) => void;
}

export const PayForm: React.FC<IPayFormProps> = ({amount, submitPayHandler, setShowErrorMessage}) => {
	const [deliveryCost, setDeliveryCost] = useState<number>(0);
	const {register, handleSubmit, formState: {errors}} = useForm<IPayForm>({
		resolver: yupResolver(yupSchema)
	});

	useEffect(() => {
		return () => {
			setShowErrorMessage(false);
		};
	}, []);

	const submitHandler = (data: IPayForm) => {
		submitPayHandler(data, amount + deliveryCost);
	};

	const changeCardNumberInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
		e.target.value = e.target.value
			.replace(/\D/g, '')
			.match(/.{1,4}/g)
			?.join(' ')
			.slice(0, 19) || '';
	};

	const changeCardSecretInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
		e.target.value = e.target.value
			.replace(/\D/g, '')
			.slice(0, 3);
	};

	const changeCardPersonInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
		e.target.value = e.target.value
			.replace(/\d/g, '')
			.toUpperCase();
	};

	const changeAddressInputHandler = debounce((e: ChangeEvent<HTMLInputElement>) => {
		setDeliveryCost(Math.trunc(e.target.value.length * 9.5));
	}, 750);

	return (
		<>
			<div className={styles.info__container}>
				<div className="auth__title">Оплата</div>
				<div className="auth__title">{amount} + {deliveryCost} ₽</div>
			</div>

			<form onSubmit={handleSubmit(submitHandler)}>
				<div className={styles.form__container}>
					<div className={`auth__field__block ${styles.field__number}`}>
						<input {...register('number')}
							   className="auth__field__input"
							   placeholder="Введите номер карты"
							   onChange={(e) => changeCardNumberInputHandler(e)}
							   id="number_field"/>
						<label className={`field__label ${errors.number?.message ? 'field__error' : ''}`}
							   htmlFor="number_field">
							{errors.number?.message ? errors.number?.message : `Номер карты`}
						</label>
					</div>

					<div className={`auth__field__block ${styles.field__person}`}>
						<input {...register('person')}
							   className="auth__field__input"
							   placeholder="Введите имя владельца карты"
							   onChange={(e) => changeCardPersonInputHandler(e)}
							   id="person_field"/>
						<label className={`field__label ${errors.person?.message ? 'field__error' : ''}`}
							   htmlFor="person_field">
							{errors.person?.message ? errors.person?.message : `Имя владельца`}
						</label>
					</div>

					<div className={`auth__field__block ${styles.field__secret}`}>
						<input {...register('secret')}
							   className="auth__field__input"
							   placeholder="Введите cvc код"
							   onChange={(e) => changeCardSecretInputHandler(e)}
							   id="secret_field"/>
						<label className={`field__label ${errors.secret?.message ? 'field__error' : ''}`}
							   htmlFor="secret_field">
							{errors.secret?.message ? errors.secret?.message : `CVC`}
						</label>
					</div>

					<div className={styles.delimiter}/>

					<div className={`auth__field__block ${styles.field__address}`}>
						<input {...register('address')}
							   className="auth__field__input"
							   placeholder="Введите адрес"
							   onChange={(e) => changeAddressInputHandler(e)}
							   id="address_field"/>
						<label className={`field__label ${errors.address?.message ? 'field__error' : ''}`}
							   htmlFor="address_field">
							{errors.address?.message ? errors.address?.message : `Адрес`}
						</label>
					</div>
				</div>

				<input type={'submit'} className={`button button--black ${styles.form__button}`}/>
			</form>
		</>
	);
};