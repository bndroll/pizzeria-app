import React from 'react';
import { useSelector } from 'react-redux';
import { selectUserData, selectUserStatus } from '../store/user/selectors';
import { useAppDispatch } from '../store/store';
import { singOut } from '../store/auth/asyncActions';
import { selectPizzaOrders } from '../store/pizzaOrder/selectors';
import { PizzaOrderItem } from '../components/PizzaOrderItem/PizzaOrderItem';
import { Status } from '../store/types';
import { Link } from 'react-router-dom';


const Profile: React.FC = () => {
	const dispatch = useAppDispatch();
	const userData = useSelector(selectUserData);
	const userStatus = useSelector(selectUserStatus);
	const pizzaOrders = useSelector(selectPizzaOrders);

	const logoutHandler = () => {
		dispatch(singOut());
	};

	return (
		<div className="container">
			<div className="profile__info-content">
				<div className="content__title--small">Мой профиль</div>

				<div className="profile__info-container">
					<div className="profile__info">
						Имя пользователя: {userStatus === Status.SUCCESS && <span>{userData?.username}</span>}
					</div>
					<div className="profile__info">
						Почта: {userStatus === Status.SUCCESS && <span>{userData?.email}</span>}
					</div>
					<button className="button button--black button--logout" onClick={logoutHandler}>Выйти</button>

					{
						userData?.role === 'admin' &&
                        <Link className="button button--black button--logout" to={'/admin'}>Админ</Link>
					}
				</div>
			</div>

			<div className="orders-content">
				<div className="content__title--small">Мои заказы</div>

				<div className="orders-container">
					{
						pizzaOrders.length ?
							pizzaOrders.map(item => <PizzaOrderItem key={item.id}
																	address={item.address}
																	orderDetails={item.orderDetails}/>)
							:
							(
								<div className="orders__empty">
									Заказов нет <span>😕</span>
									<p>
										Вероятней всего, вы не заказывали ещё пиццу.
										<br/>
										Для того, чтобы заказать пиццу, перейди на главную страницу.
									</p>
								</div>
							)
					}
				</div>
			</div>
		</div>
	);
};

export default Profile;
