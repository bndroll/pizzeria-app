import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAppDispatch } from '../../store/store';
import { singUp } from '../../store/auth/asyncActions';
import styles from './Register.module.scss';


export interface IRegisterForm {
	username: string;
	email: string;
	password: string;
	password2: string;
}

const yupSchema = yup.object({
	username: yup.string().required('Введите имя пользователя'),
	email: yup.string().email('Неверная почта').required('Введите почту'),
	password: yup.string().required('Введите пароль'),
	password2: yup.string().oneOf([yup.ref('password')], 'Пароли не совпадают').required('Повторите пароль')
});

interface IRegisterProps {
	setShowErrorMessage: (param: boolean) => void;
}

export const Register: React.FC<IRegisterProps> = ({setShowErrorMessage}) => {
	const dispatch = useAppDispatch();
	const {register, handleSubmit, formState: {errors}} = useForm<IRegisterForm>({
		resolver: yupResolver(yupSchema)
	});

	useEffect(() => {
		return () => {
			setShowErrorMessage(false);
		};
	}, []);

	const onSubmit = (data: IRegisterForm) => {
		dispatch(singUp({
			username: data.username,
			email: data.email,
			password: data.password,
			roles: ['user']
		}));
	};

	return (
		<>
			<div className="auth__title">Регистрация</div>

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

					<div className={`auth__field__block ${styles.field__email}`}>
						<input {...register('email')}
							   className="auth__field__input"
							   placeholder="Введите почту"
							   id="email_field"/>
						<label className={`field__label ${errors.email?.message ? 'field__error' : ''}`}
							   htmlFor="email_field">
							{errors.email?.message ? errors.email?.message : `Почта`}
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

					<div className={`auth__field__block ${styles.field__password2}`}>
						<input {...register('password2')}
							   className="auth__field__input"
							   placeholder="Введите пароль"
							   id="password2_field"/>
						<label className={`field__label ${errors.password2?.message ? 'field__error' : ''}`}
							   htmlFor="password2_field">
							{errors.password2?.message ? errors.password2?.message : `Повторите пароль`}
						</label>
					</div>
				</div>

				<input type={'submit'} className={`button button--black ${styles.form__button}`}/>
			</form>
		</>
	);
};