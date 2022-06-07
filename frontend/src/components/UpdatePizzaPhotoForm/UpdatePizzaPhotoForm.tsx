import React, { ChangeEvent, useRef } from 'react';
import { updatePizzaGroupPhoto } from '../../store/pizza/asyncActions';
import { useAppDispatch } from '../../store/store';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import * as yup from 'yup';
import cardImg from '../../assets/img/empty-cart.png';
import styles from './UpdatePizzaPhotoForm.module.scss';


export interface IUpdatePizzaPhotoForm {
	file: FileList;
}

const yupSchema = yup.object({
	file: yup.mixed().test('required', 'Вставьте фото', value => value && value.length)
});

interface ICreatePizzaFormProps {
	title: string;
	setFormType: (param: 'update' | 'updatePhoto' | null) => void;
}

export const UpdatePizzaPhotoForm: React.FC<ICreatePizzaFormProps> = ({title, setFormType}) => {
	const imgRef = useRef<HTMLImageElement | null>(null);
	const dispatch = useAppDispatch();
	const {register, handleSubmit, formState: {errors}} = useForm<IUpdatePizzaPhotoForm>({
		resolver: yupResolver(yupSchema)
	});

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

	const submitUpdatePizzaHandler = (data: IUpdatePizzaPhotoForm) => {
		dispatch(updatePizzaGroupPhoto({
			title: title,
			file: data.file[0]
		}));

		setFormType(null);
	};

	return (
		<div className={styles.form__wrapper}>
			<div className="content__title--small">Обновление пиццы</div>

			<div className={styles.inner}>
				<form onSubmit={handleSubmit(submitUpdatePizzaHandler)} className={styles.form}>
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

					<input type={'submit'} className={`button button--black ${styles.form__button}`}/>
				</form>

				<div className={styles.img__container}>
					<img src={cardImg} ref={imgRef} alt="auth image" className={styles.img} height="470px" width="470px"/>
				</div>
			</div>
		</div>
	);
};