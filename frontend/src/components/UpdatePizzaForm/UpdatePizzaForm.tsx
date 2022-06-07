import React from 'react';
import * as yup from 'yup';
import { useAppDispatch } from '../../store/store';
import { updatePizza } from '../../store/pizza/asyncActions';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import styles from './UpdatePizzaForm.module.scss';


export interface IUpdatePizzaForm {
	price: number;
	rating: number;
}

const yupSchema = yup.object({
	price: yup.number().required('Введите цену'),
	rating: yup.number().required('Введите рейтинг')
});

interface ICreatePizzaFormProps {
	id: number;
	setFormType: (param: 'update' | 'updatePhoto' | null) => void;
}

export const UpdatePizzaForm: React.FC<ICreatePizzaFormProps> = ({id, setFormType}) => {
	const dispatch = useAppDispatch();
	const {register, handleSubmit, formState: {errors}} = useForm<IUpdatePizzaForm>({
		resolver: yupResolver(yupSchema)
	});

	const submitUpdatePizzaHandler = (data: IUpdatePizzaForm) => {
		dispatch(updatePizza({
			id: id,
			price: data.price,
			rating: data.rating
		}));

		setFormType(null);
	};

	return (
		<div className={styles.form__wrapper}>
			<div className="content__title--small">Обновление пиццы</div>

			<form onSubmit={handleSubmit(submitUpdatePizzaHandler)}>
				<div className={styles.form__container}>
					<div className={`auth__field__block ${styles.field__price}`}>
						<input {...register('price')}
							   className="auth__field__input"
							   placeholder="Введите новую цену пиццы"
							   id="price_field"/>
						<label className={`field__label ${errors.price?.message ? 'field__error' : ''}`}
							   htmlFor="price_field">
							{errors.price?.message ? errors.price?.message : `Новая цена`}
						</label>
					</div>

					<div className={`auth__field__block ${styles.field__rating}`}>
						<input {...register('rating')}
							   className="auth__field__input"
							   placeholder="Введите новый рейтинг пиццы"
							   id="rating_field"/>
						<label className={`field__label ${errors.rating?.message ? 'field__error' : ''}`}
							   htmlFor="rating_field">
							{errors.rating?.message ? errors.rating?.message : `Новый рейтинг`}
						</label>
					</div>
				</div>

				<input type={'submit'} className={`button button--black ${styles.form__button}`}/>
			</form>
		</div>
	);
};