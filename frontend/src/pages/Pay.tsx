import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IPayForm, PayForm } from '../components/PayForm/PayForm';
import { selectCartItems, selectCartTotalPrice } from '../store/cart/selectors';
import { selectPayErrorMessage, selectPayStatus } from '../store/pay/selectors';
import { payByTerminalKey } from '../store/pay/asyncActions';
import { useAppDispatch } from '../store/store';
import { clearPayState } from '../store/pay/slice';
import { crateOrder } from '../store/pizzaOrder/asyncActions';
import { clearItems } from '../store/cart/slice';
import cardImg from '../assets/img/empty-cart.png';
import logoSvg from '../assets/icons/pizza-logo.svg';
import { Status } from '../store/types';


const Pay: React.FC = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const totalPrice = useSelector(selectCartTotalPrice);
	const payStatus = useSelector(selectPayStatus);
	const payErrorMessage = useSelector(selectPayErrorMessage);
	const cartItems = useSelector(selectCartItems);
	const [showMessage, setShowMessage] = useState<boolean>(!!payErrorMessage);
	const [addressValue, setAddressValue] = useState<string>('');

	useEffect(() => {
		setShowMessage(!!payErrorMessage);
	}, [payErrorMessage]);

	useEffect(() => {
		if (payStatus === Status.SUCCESS) {
			dispatch(crateOrder({
				items: cartItems,
				address: addressValue
			}));
			dispatch(clearItems());

			navigate('/', {replace: true});
		}
	}, [payStatus]);

	useEffect(() => {
		return () => {
			dispatch(clearPayState());
		};
	}, []);

	const closeMessageModal = () => {
		setShowMessage(false);
	};

	const submitPayHandler = (data: IPayForm, amount: number) => {
		setAddressValue(data.address);
		dispatch(payByTerminalKey({
			cartNumber: data.number,
			person: data.person,
			secret: data.secret,
			amount: amount
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
						payStatus === Status.ERROR &&
                        <div className="button button--outline" onClick={closeMessageModal}>
							{payErrorMessage}
                        </div>
					}
					{
						payStatus === Status.SUCCESS &&
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
							<PayForm submitPayHandler={submitPayHandler}
									 setShowErrorMessage={setShowMessage}
									 amount={totalPrice}/>
						</div>

						<div className="pay__img__container">
							<img src={cardImg} className="pay__card__img" alt="auth image"/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Pay;