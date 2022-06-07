import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../store/store';
import { selectPizzaItem } from '../store/pizza/selectors';
import { selectCartItemCount } from '../store/cart/selectors';
import { IPizzaResponse } from '../store/pizza/types';
import { ICartItem } from '../store/cart/types';
import { addItem } from '../store/cart/slice';
import { Link, useNavigate } from 'react-router-dom';


interface IPizzaBlockProps {
	title: string;
	imageUrl: string;
	types: string[];
	sizes: number[];
}

export const PizzaBlock: React.FC<IPizzaBlockProps> = ({title, imageUrl, types, sizes}) => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [activeType, setActiveType] = useState(types[0]);
	const [activeSize, setActiveSize] = useState(sizes[0]);
	const [price, setPrice] = useState<number | undefined>(0);
	const cartItemCount = useSelector(selectCartItemCount(title));
	const pizzaItem: IPizzaResponse = useSelector(selectPizzaItem({
		title: title,
		type: activeType,
		size: activeSize
	}))!;

	useEffect(() => {
		setPrice(pizzaItem?.price);
	}, [activeType, activeSize]);

	const addPizzaToCartHandler = () => {
		const cartItem: ICartItem = {
			id: pizzaItem.id,
			title: title,
			imageUrl: imageUrl,
			type: activeType,
			size: activeSize,
			price: pizzaItem.price,
			count: 0
		};

		dispatch(addItem(cartItem));
	};

	return (
		<div className="pizza-block-wrapper">
			<div className="pizza-block">
				<Link to={!!pizzaItem ? `/pizza/${pizzaItem?.id}` : '/'}>
					<img className="pizza-block__image" src={imageUrl} alt={title} width={260} height={260}/>
					<h4 className="pizza-block__title">{title}</h4>
				</Link>
				<div className="pizza-block__selector">
					<ul>
						{types.map((type, i) => (
							<li key={i}
								onClick={() => setActiveType(type)}
								className={activeType === type ? 'active' : ''}>
								{type}
							</li>
						))}
					</ul>

					<ul>
						{sizes.map(size => (
							<li key={size}
								onClick={() => setActiveSize(size)}
								className={activeSize === size ? 'active' : ''}>
								{size} см.
							</li>
						))}
					</ul>
				</div>
				<div className="pizza-block__bottom">
					<div className="pizza-block__price">
						от {!!price && !!pizzaItem ? price : 0} ₽
					</div>
					{
						!!pizzaItem ?
							(
								<button onClick={addPizzaToCartHandler} className='button button--outline button--add'>
									<svg width="12"
										 height="12"
										 viewBox="0 0 12 12"
										 fill="none"
										 xmlns="http://www.w3.org/2000/svg">
										<path
											d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
											fill="white"
										/>
									</svg>
									<span>Добавить</span>
									{cartItemCount > 0 && <i>{cartItemCount}</i>}
								</button>
							) :
							(
								<button disabled={!!pizzaItem} className='button--disabled'>
									<svg width="12"
										 height="12"
										 viewBox="0 0 12 12"
										 fill="none"
										 xmlns="http://www.w3.org/2000/svg">
										<path
											d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
											fill="white"
										/>
									</svg>
									<span>Добавить</span>
								</button>
							)
					}
				</div>
			</div>
		</div>
	);
};