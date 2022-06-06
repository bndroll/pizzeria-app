import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import * as yup from 'yup';
import { useAppDispatch } from '../../store/store';
import { singIn } from '../../store/auth/asyncActions';
import styles from './Login.module.scss';


export interface ILoginForm {
	username: string;
	password: string;
}

const yupSchema = yup.object({
	username: yup.string().required('Введите имя пользователя'),
	password: yup.string().required('Введите пароль')
});

interface ILoginProps {
	setShowErrorMessage: (param: boolean) => void;
}

export const Login: React.FC<ILoginProps> = ({setShowErrorMessage}) => {
	const dispatch = useAppDispatch();
	const {register, handleSubmit, formState: {errors}} = useForm<ILoginForm>({
		resolver: yupResolver(yupSchema)
	});

	useEffect(() => {
		return () => {
			setShowErrorMessage(false);
		};
	}, []);

	const onSubmit = (data: ILoginForm) => {
		dispatch(singIn(data));
	};

	return (
		<>
			<div className="auth__title">Вход</div>

			<form onSubmit={handleSubmit(onSubmit)}>
				<div className={styles.form__container}>
					<div className={`auth__field__block ${styles.field__username}`}>
						<input {...register('username')}
							   className="auth__field__input"
							   placeholder="Введите имя пользователя"
							   id="username_field"/>
						<label className={`field__label ${errors.username?.message ? 'field__error' : ''}`}
							   htmlFor="username_field">
							{errors.username?.message ? errors.username?.message : `Имя пользователя`}
						</label>
					</div>

					<div className={`auth__field__block ${styles.field__password}`}>
						<input {...register('password')}
							   className="auth__field__input"
							   placeholder="Введите пароль"
							   id="password_field"/>
						<label className={`field__label ${errors.password?.message ? 'field__error' : ''}`}
							   htmlFor="password_field">
							{errors.password?.message ? errors.password?.message : `Пароль`}
						</label>
					</div>
				</div>

				<input type={'submit'} className={`button button--black ${styles.form__button}`}/>
			</form>
		</>
	);
};