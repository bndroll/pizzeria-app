import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IPizzaOrderDetailsResponse } from '../../store/pizzaOrder/types';
import { useAppDispatch } from '../../store/store';
import { replaceItems } from '../../store/cart/slice';
import { ICartItem } from '../../store/cart/types';
import styles from './PizzaOrderItem.module.scss';


interface IPizzaOrderItemProps {
	address: string;
	orderDetails: IPizzaOrderDetailsResponse[];
}

export const PizzaOrderItem: React.FC<IPizzaOrderItemProps> = ({address, orderDetails}) => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const getTotalPrice = (): number => {
		return orderDetails.reduce((res, item) => res + item.count * item.pizza.price, 0) + Math.trunc(address.length * 9.5);
	};

	const castOrderDetailsToCartItems = (orderDetails: IPizzaOrderDetailsResponse[]): ICartItem[] => {
		return orderDetails.map(item => {
			return {
				id: item.pizza.id,
				title: item.pizza.title,
				imageUrl: `${process.env.REACT_APP_FILE_SYSTEM_SERVER_URL}${item.pizza.imageUrl}`,
				type: item.pizza.type,
				size: item.pizza.size,
				price: item.pizza.price,
				count: item.count
			};
		});
	};

	const repeatOrder = () => {
		dispatch(replaceItems(
			castOrderDetailsToCartItems(orderDetails)
		));

		navigate('/cart', {replace: true});
	};

	return (
		<div className={styles.order__item}>
			<div className={styles.order__details}>
				<div className={styles.details__info}>
					<div className={styles.details__item}>
						<div className={styles.details__pizza__address}>Адрес</div>
						<div className={styles.details__price__address}>{address}</div>
					</div>

					{
						orderDetails.map(item => (
							<div className={styles.details__item} key={item.id}>
								<div className={styles.details__pizza}>
									{item.count} × {item.pizza.title} ({item.pizza.type}, {item.pizza.size} см)
								</div>
								<div className={styles.details__price}>
									{item.pizza.price * item.count}
								</div>
							</div>
						))
					}

					<div className={styles.details__item}>
						<div className={styles.details__pizza}>Доставка</div>
						<div className={styles.details__price}>{Math.trunc(address.length * 9.5)}</div>
					</div>

					<div className={styles.details__item}>
						<div className={styles.details__pizza__result}>Итого</div>
						<div className={styles.details__price__result}>{getTotalPrice()}</div>
					</div>
				</div>

				<button className={`button ${styles.repeat__button}`} onClick={repeatOrder}>
					<svg width="30" height="30" viewBox="0 0 50 38" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M36.0438 15.875H48.3313C48.4797 15.8751 48.6251 15.9174 48.7503 15.9971C48.8756 16.0768 48.9755 16.1905 49.0385 16.3249C49.1015 16.4594 49.1248 16.609 49.1058 16.7562C49.0868 16.9034 49.0263 17.0422 48.9313 17.1562L42.7875 24.5313C42.7142 24.6192 42.6225 24.6899 42.5188 24.7384C42.4151 24.787 42.302 24.8121 42.1875 24.8121C42.073 24.8121 41.96 24.787 41.8563 24.7384C41.7526 24.6899 41.6608 24.6192 41.5875 24.5313L35.4438 17.1562C35.3488 17.0422 35.2882 16.9034 35.2692 16.7562C35.2502 16.609 35.2736 16.4594 35.3366 16.3249C35.3995 16.1905 35.4995 16.0768 35.6247 15.9971C35.75 15.9174 35.8953 15.8751 36.0438 15.875V15.875ZM1.66877 22.125H13.9563C14.1047 22.1249 14.2501 22.0826 14.3753 22.0029C14.5006 21.9232 14.6005 21.8095 14.6635 21.6751C14.7265 21.5406 14.7498 21.391 14.7308 21.2438C14.7118 21.0966 14.6513 20.9578 14.5563 20.8438L8.41252 13.4687C8.3392 13.3808 8.24746 13.3101 8.14377 13.2616C8.04009 13.213 7.92701 13.1879 7.81252 13.1879C7.69804 13.1879 7.58496 13.213 7.48128 13.2616C7.37759 13.3101 7.28585 13.3808 7.21253 13.4687L1.06877 20.8438C0.973768 20.9578 0.913225 21.0966 0.894236 21.2438C0.875247 21.391 0.898597 21.5406 0.961554 21.6751C1.02451 21.8095 1.12447 21.9232 1.24972 22.0029C1.37497 22.0826 1.52033 22.1249 1.66877 22.125V22.125Z"
							fill="white"/>
						<path fillRule="evenodd" clipRule="evenodd"
							  d="M25 3.375C20.15 3.375 15.8125 5.58437 12.9469 9.05625C12.8189 9.2221 12.6589 9.36053 12.4764 9.46331C12.2939 9.56609 12.0925 9.63111 11.8844 9.65451C11.6762 9.67792 11.4655 9.65923 11.2647 9.59955C11.0639 9.53987 10.8771 9.44042 10.7155 9.30713C10.5539 9.17383 10.4208 9.00939 10.324 8.82361C10.2272 8.63782 10.1688 8.43447 10.1522 8.22565C10.1356 8.01683 10.1612 7.80681 10.2274 7.60806C10.2935 7.40932 10.399 7.22591 10.5375 7.06875C12.8256 4.29852 15.8612 2.24378 19.2833 1.14892C22.7055 0.054062 26.37 -0.0348446 29.8412 0.892777C33.3124 1.8204 36.4441 3.72551 38.8638 6.38152C41.2835 9.03753 42.8895 12.3327 43.4906 15.875H40.3125C39.591 12.3463 37.6731 9.17497 34.8829 6.89733C32.0928 4.61968 28.6018 3.37544 25 3.375V3.375ZM9.68752 22.125C10.2791 25.0144 11.6761 27.6776 13.7171 29.8067C15.7582 31.9358 18.3599 33.444 21.2218 34.1571C24.0837 34.8702 27.0889 34.7591 29.8903 33.8366C32.6917 32.9141 35.175 31.2178 37.0531 28.9437C37.1811 28.7779 37.3411 28.6395 37.5236 28.5367C37.7062 28.4339 37.9075 28.3689 38.1157 28.3455C38.3238 28.3221 38.5346 28.3408 38.7354 28.4004C38.9362 28.4601 39.1229 28.5596 39.2845 28.6929C39.4461 28.8262 39.5793 28.9906 39.676 29.1764C39.7728 29.3622 39.8312 29.5655 39.8478 29.7743C39.8644 29.9832 39.8389 30.1932 39.7727 30.3919C39.7065 30.5907 39.601 30.7741 39.4625 30.9312C37.1744 33.7015 34.1388 35.7562 30.7167 36.8511C27.2946 37.9459 23.63 38.0348 20.1589 37.1072C16.6877 36.1796 13.556 34.2745 11.1362 31.6185C8.7165 28.9625 7.11055 25.6673 6.5094 22.125H9.68752Z"
							  fill="white"/>
					</svg>
				</button>
			</div>

			<div className={styles.order__delimiter}></div>
		</div>
	);
};