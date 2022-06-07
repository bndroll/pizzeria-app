import React, { useEffect } from 'react';
import { useAppDispatch } from '../store/store';
import { findMostOrderedPizzas, findMostPopularPizzas } from '../store/statistic/asyncActions';
import { useSelector } from 'react-redux';
import { selectMostOrderedPizzas, selectMostPopularPizzas } from '../store/statistic/selectors';
import { StatisticPizzaBlock } from '../components/StatisticPizzaBlock';
import { Link } from 'react-router-dom';


const Admin: React.FC = () => {
	const dispatch = useAppDispatch();
	const mostPopularPizzas = useSelector(selectMostPopularPizzas);
	const mostOrderedPizzas = useSelector(selectMostOrderedPizzas);

	useEffect(() => {
		dispatch(findMostPopularPizzas());
		dispatch(findMostOrderedPizzas());
	}, []);

	return (
		<div className="container">
			<div>
				<div className="content__title--small">Самые популярные пиццы</div>

				<div className="content__items">
					{
						mostPopularPizzas.map(item => <StatisticPizzaBlock key={item.id}
																		   id={item.id}
																		   title={item.title}
																		   image={item.image}
																		   type={item.type}
																		   size={item.size}
																		   category={item.category}
																		   price={item.price}
																		   rating={item.rating}
																		   ordersCount={item.ordersCount}/>)
					}
				</div>
			</div>

			<div>
				<div className="content__title--small">Самые заказываемые пиццы</div>

				<div className="content__items">
					{
						mostOrderedPizzas.map(item => <StatisticPizzaBlock key={item.id}
																		   id={item.id}
																		   title={item.title}
																		   image={item.image}
																		   type={item.type}
																		   size={item.size}
																		   category={item.category}
																		   price={item.price}
																		   rating={item.rating}
																		   ordersCount={item.ordersCount}/>)
					}
				</div>
			</div>

			<div>
				<div className="content__title--small">Действия с пиццами</div>

				<Link className="button button--logout" to={'/create-pizza'}>Создать пиццу</Link>
			</div>
		</div>
	);
};

export default Admin;