import React, { ChangeEvent, MutableRefObject } from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import styles from './CreatePizzaForm.module.scss';
import cardImg from '../../assets/img/empty-cart.png';


export interface ICreatePizzaForm {
	file: FileList;
	title: string;
	type: string;
	size: number;
	category: string;
	price: number;
	rating: number;
}

const yupSchema = yup.object({
	file: yup.mixed().test('required', 'Вставьте фото', value => value && value.length),
	title: yup.string().required('Введите название'),
	type: yup.string().oneOf(['тонкое', 'традиционное'], 'Тип теста может быть (тонкое, традиционное)').required('Введите тип'),
	size: yup.number().oneOf([25, 30, 40], 'Размер может быть (25, 30, 40)').required('Введите размер'),
	category: yup.string().required('Введите категорию'),
	price: yup.number().required('Введите цену'),
	rating: yup.number().required('Введите рейтинг')
});

interface ICreatePizzaFormProps {
	imgRef: MutableRefObject<HTMLImageElement | null>;
	submitCreatePizzaHandler: (data: ICreatePizzaForm) => void;
}

export const CreatePizzaForm: React.FC<ICreatePizzaFormProps> = ({imgRef, submitCreatePizzaHandler}) => {
	const {register, handleSubmit, formState: {errors}} = useForm<ICreatePizzaForm>({
		resolver: yupResolver(yupSchema)
	});

	const submitHandler = (data: ICreatePizzaForm) => {
		submitCreatePizzaHandler(data);
	};

	const changeFileInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			const file = e.target.files[0];
			const reader = new FileReader();

			reader.onload = (event) => {
				if (imgRef.current)
					imgRef.current.src = event.target?.result || cardImg;
			};

			reader.readAsDataURL(file);
		}
	};

	return (
		<>
			<div className="content__title--small">Создание пиццы</div>

			<form onSubmit={handleSubmit(submitHandler)}>
				<div className={styles.form__container}>
					<div className={styles.file__input__container}>
						<input {...register('file')}
							   type="file"
							   name="file"
							   id="file__input"
							   onChange={changeFileInputHandler}
							   className={styles.file__input}/>
						<label htmlFor="file__input" className={styles.file__input__label}>
							<span className={styles.file__input__label__img}>
								<svg width="22" height="22" viewBox="0 0 30 30" fill="#ffffff"
									 xmlns="http://www.w3.org/2000/svg">
									<path d="M13.75 18.75H16.25V11.25H20L15 5L10 11.25H13.75V18.75Z"/>
									<path
										d="M25 22.5H5V13.75H2.5V22.5C2.5 23.8788 3.62125 25 5 25H25C26.3787 25 27.5 23.8788 27.5 22.5V13.75H25V22.5Z"/>
								</svg>
							</span>
							<span className={styles.file__input__label__text}>Выберите файл</span>
						</label>
						<div className={styles.file__input__error}>{errors.file?.message && errors.file?.message}</div>
					</div>

					<div className={`auth__field__block ${styles.field__title}`}>
						<input {...register('title')}
							   className="auth__field__input"
							   placeholder="Введите название пиццы"
							   id="title_field"/>
						<label className={`field__label ${errors.title?.message ? 'field__error' : ''}`}
							   htmlFor="title_field">
							{errors.title?.message ? errors.title?.message : `Название`}
						</label>
					</div>

					<div className={`auth__field__block ${styles.field__type}`}>
						<input {...register('type')}
							   className="auth__field__input"
							   placeholder="Введите тип теста пиццы"
							   id="type_field"/>
						<label className={`field__label ${errors.type?.message ? 'field__error' : ''}`}
							   htmlFor="type_field">
							{errors.type?.message ? errors.type?.message : `Тип теста`}
						</label>
					</div>

					<div className={`auth__field__block ${styles.field__size}`}>
						<input {...register('size')}
							   className="auth__field__input"
							   placeholder="Введите размер пиццы"
							   id="size_field"/>
						<label className={`field__label ${errors.size?.message ? 'field__error' : ''}`}
							   htmlFor="size_field">
							{errors.size?.message ? errors.size?.message : `Размер`}
						</label>
					</div>

					<div className={`auth__field__block ${styles.field__category}`}>
						<input {...register('category')}
							   className="auth__field__input"
							   placeholder="Введите категорию пиццы"
							   id="category_field"/>
						<label className={`field__label ${errors.category?.message ? 'field__error' : ''}`}
							   htmlFor="category_field">
							{errors.category?.message ? errors.category?.message : `Категория`}
						</label>
					</div>

					<div className={`auth__field__block ${styles.field__price}`}>
						<input {...register('price')}
							   className="auth__field__input"
							   placeholder="Введите цену пиццы"
							   id="price_field"/>
						<label className={`field__label ${errors.price?.message ? 'field__error' : ''}`}
							   htmlFor="price_field">
							{errors.price?.message ? errors.price?.message : `Цена`}
						</label>
					</div>

					<div className={`auth__field__block ${styles.field__rating}`}>
						<input {...register('rating')}
							   className="auth__field__input"
							   placeholder="Введите рейтинг пиццы"
							   id="rating_field"/>
						<label className={`field__label ${errors.rating?.message ? 'field__error' : ''}`}
							   htmlFor="rating_field">
							{errors.rating?.message ? errors.rating?.message : `Рейтинг`}
						</label>
					</div>
				</div>

				<input type={'submit'} className={`button button--black ${styles.form__button}`}/>
			</form>
		</>
	);
};