import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import logoSvg from '../assets/icons/pizza-logo.svg';
import cardImg from '../assets/img/empty-cart.png';
import { CreatePizzaForm, ICreatePizzaForm } from '../components/CreatePizzaForm/CreatePizzaForm';
import { useSelector } from 'react-redux';
import { selectPizzaErrorMessage, selectPizzaStatus } from '../store/pizza/selectors';
import { Status } from '../store/types';
import { useAppDispatch } from '../store/store';
import { createPizza } from '../store/pizza/asyncActions';
import { resetPizzaStatus } from '../store/pizza/slice';


const CreatePizza: React.FC = () => {
	const dispatch = useAppDispatch();
	const pizzaStatus = useSelector(selectPizzaStatus);
	const pizzaErrorMessage = useSelector(selectPizzaErrorMessage);
	const [showMessage, setShowMessage] = useState<boolean>(!!pizzaErrorMessage);
	const imgRef = useRef<HTMLImageElement | null>(null);

	useEffect(() => {
		dispatch(resetPizzaStatus());
	}, []);

	useEffect(() => {
		setShowMessage(!!pizzaErrorMessage);
	}, [pizzaErrorMessage]);

	const closeMessageModal = () => {
		setShowMessage(false);
	};

	const submitCreatePizzaHandler = (data: ICreatePizzaForm) => {
		dispatch(createPizza({
			file: data.file[0],
			title: data.title,
			type: data.type,
			size: data.size,
			category: data.category,
			price: data.price,
			rating: data.rating
		}));
	};

	return (
		<div className="wrapper">
			<div className="header">
				<div className="container">
					<Link to="/">
						<div className="header__logo">
							<img width="38" src={logoSvg} alt="Pizza logo"/>
							<div>
								<h1>Pizzeria App</h1>
								<p>самая вкусная пицца во вселенной</p>
							</div>
						</div>
					</Link>

					{
						showMessage &&
						pizzaStatus === Status.ERROR &&
                        <div className="button button--outline" onClick={closeMessageModal}>
							{pizzaErrorMessage}
                        </div>
					}
					{
						pizzaStatus === Status.SUCCESS &&
                        <div className="button button--green">
                            Успешно
                        </div>
					}
				</div>
			</div>

			<div className="content">
				<div className="container">
					<div className="pay__container">
						<div className="pay__main__container">
							<CreatePizzaForm imgRef={imgRef}
											 submitCreatePizzaHandler={submitCreatePizzaHandler}/>
						</div>

						<div className="pay__img__container">
							<img src={cardImg}
								 ref={imgRef}
								 className="pay__card__img"
								 alt="auth image"
								 width="400px"
								 height="400px"/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CreatePizza;