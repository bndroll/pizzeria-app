import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectPizzaItemById } from '../store/pizza/selectors';
import { selectUserData } from '../store/user/selectors';
import { useAppDispatch } from '../store/store';
import { deletePizzaById, deletePizzaByTitle } from '../store/pizza/asyncActions';
import { UpdatePizzaForm } from '../components/UpdatePizzaForm/UpdatePizzaForm';
import { UpdatePizzaPhotoForm } from '../components/UpdatePizzaPhotoForm/UpdatePizzaPhotoForm';


const FullPizza: React.FC = () => {
	const {id} = useParams();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const pizza = useSelector(selectPizzaItemById(Number(id)));
	const user = useSelector(selectUserData);
	const [formType, setFormType] = useState<'update' | 'updatePhoto' | null>(null);

	if (!pizza)
		return <div className="container">Загрузка...</div>;

	const deletePizzaByIdHandler = () => {
		dispatch(deletePizzaById(Number(id)));
		navigate('/', {replace: false});
	};

	const deletePizzaByTitleHandler = () => {
		dispatch(deletePizzaByTitle(pizza.title));
		navigate('/', {replace: false});
	};

	const showUpdateForm = () => {
		setFormType((prev) => prev === 'update' ? null : 'update');
	};

	const showUpdatePhotoForm = () => {
		setFormType((prev) => prev === 'updatePhoto' ? null : 'updatePhoto');
	};

	return (
		<div className="container">
			<div className="full__pizza__wrapper">
				<div className="full__pizza__image--container">
					<img className="full__pizza__image" src={pizza.imageUrl} alt={pizza.title} width="470px"
						 height="470px"/>
				</div>

				<div className="full__pizza__info">
					<h2 className="full__pizza__field full__pizza__title">{pizza.title}</h2>

					<div className="full__pizza__details">
						<div className="full__pizza__key">Категория</div>
						<div className="full__pizza__value">{pizza.category}</div>

						<div className="full__pizza__key">Тип теста</div>
						<div className="full__pizza__value">{pizza.type}</div>

						<div className="full__pizza__key">Размер</div>
						<div className="full__pizza__value">{pizza.size} см.</div>

						<div className="full__pizza__key">Цена</div>
						<div className="full__pizza__value">{pizza.price} ₽</div>

						<div className="full__pizza__key">Рейтинг</div>
						<div className="full__pizza__value">{pizza.rating}</div>
					</div>

					<Link to="/" className="button button--black full__pizza__back">
						<span>Вернуться назад</span>
					</Link>

					{
						user?.role === 'admin' &&
                        <div className="full__pizza__admin__buttons">
                            <button className="button full__pizza__button" onClick={showUpdateForm}>
                                Изменить
                            </button>
                            <button className="button full__pizza__button" onClick={showUpdatePhotoForm}>
                                Изменить фото
                            </button>
                            <button className="button full__pizza__button"
                                    onClick={deletePizzaByIdHandler}>
                                Удалить
                            </button>
                            <button className="button full__pizza__button"
                                    onClick={deletePizzaByTitleHandler}>
                                Удалить вид
                            </button>
                        </div>
					}
				</div>
			</div>

			{
				user?.role === 'admin' &&
				formType === 'update' &&
                <UpdatePizzaForm id={Number(id)} setFormType={setFormType}/>
			}
			{
				user?.role === 'admin' &&
				formType === 'updatePhoto' &&
                <UpdatePizzaPhotoForm title={pizza.title} setFormType={setFormType}/>
			}
		</div>
	);
};

export default FullPizza;