import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Login } from '../components/Login/Login';
import { Register } from '../components/Register/Register';
import { selectIsAuth, selectUserErrorMessage, selectUserStatus } from '../store/user/selectors';
import { Status } from '../store/types';
import cardImg from '../assets/img/empty-cart.png';
import logoSvg from '../assets/icons/pizza-logo.svg';


export const Auth = () => {
	const navigate = useNavigate();
	const isAuth = useSelector(selectIsAuth);
	const userStatus = useSelector(selectUserStatus);
	const userErrorMessage = useSelector(selectUserErrorMessage);
	const isReady = userStatus !== Status.LOADING && userStatus !== Status.NEVER;
	const [authType, setAuthType] = useState<'login' | 'register'>('login');
	const [showErrorMessage, setShowErrorMessage] = useState<boolean>(!!userErrorMessage);

	useEffect(() => {
		if (isAuth && isReady)
			navigate('/', {replace: true});

	}, [isAuth, isReady]);

	useEffect(() => {
		setShowErrorMessage(!!userErrorMessage);
	}, [userErrorMessage]);

	const setRegisterType = () => {
		setAuthType('register');
	};

	const setLoginType = () => {
		setAuthType('login');
	};

	const closeErrorMessageModal = () => {
		setShowErrorMessage(false);
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
						showErrorMessage &&
                        <div className="button button--outline" onClick={closeErrorMessageModal}>
							{userErrorMessage}
                        </div>
					}
				</div>
			</div>

			<div className="content">
				<div className="container">
					<div className="auth__container">
						<div className="auth__main__container">
							<div className="auth__button_inner">
								<button className="button button--add" onClick={setLoginType}>
									Войти
								</button>
								<button className="button button--add" onClick={setRegisterType}>
									Зарегистрироваться
								</button>
							</div>

							{
								authType === 'login' ?
									<Login setShowErrorMessage={setShowErrorMessage}/> :
									<Register setShowErrorMessage={setShowErrorMessage}/>
							}
						</div>

						<div className="auth__img__container">
							<img src={cardImg} className="auth__card__img" alt="auth image"/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};