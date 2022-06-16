import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Search } from './Search/Search';
import { selectCart } from '../store/cart/selectors';
import logoSvg from '../assets/icons/pizza-logo.svg';
import cookies from 'js-cookie';
import { selectUserData } from '../store/user/selectors';


export const Header: React.FC = () => {
	const {items, totalPrice, totalCount} = useSelector(selectCart);
	const user = useSelector(selectUserData);
	const location = useLocation();

	useEffect(() => {
		if (user) {
			cookies.set(`cart_${user.id}`, JSON.stringify(items), {expires: 30});
		}
	}, [items, user]);

	return (
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
					location.pathname !== '/cart' && <Search/>
				}

				<div className="header__cart">
					{location.pathname !== '/cart' && (
						<Link to="/cart" className="button button--cart">
							<span>{totalPrice} ₽</span>
							<div className="button__delimiter"></div>
							<svg width="18"
								 height="18"
								 viewBox="0 0 18 18"
								 fill="none"
								 xmlns="http://www.w3.org/2000/svg">
								<path
									d="M6.33333 16.3333C7.06971 16.3333 7.66667 15.7364 7.66667 15C7.66667 14.2636 7.06971 13.6667 6.33333 13.6667C5.59695 13.6667 5 14.2636 5 15C5 15.7364 5.59695 16.3333 6.33333 16.3333Z"
									stroke="white"
									strokeWidth="1.8"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<path
									d="M14.3333 16.3333C15.0697 16.3333 15.6667 15.7364 15.6667 15C15.6667 14.2636 15.0697 13.6667 14.3333 13.6667C13.597 13.6667 13 14.2636 13 15C13 15.7364 13.597 16.3333 14.3333 16.3333Z"
									stroke="white"
									strokeWidth="1.8"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<path
									d="M4.78002 4.99999H16.3334L15.2134 10.5933C15.1524 10.9003 14.9854 11.176 14.7417 11.3722C14.4979 11.5684 14.1929 11.6727 13.88 11.6667H6.83335C6.50781 11.6694 6.1925 11.553 5.94689 11.3393C5.70128 11.1256 5.54233 10.8295 5.50002 10.5067L4.48669 2.82666C4.44466 2.50615 4.28764 2.21182 4.04482 1.99844C3.80201 1.78505 3.48994 1.66715 3.16669 1.66666H1.66669"
									stroke="white"
									strokeWidth="1.8"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
							<span>{totalCount}</span>
						</Link>
					)}
				</div>

				<Link className="button button--profile" to={'/profile'}>
					<svg width="42" height="46" viewBox="0 0 42 46" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M20.9999 23C26.7529 23 31.4166 18.3363 31.4166 12.5833C31.4166 6.83037 26.7529 2.16667 20.9999 2.16667C15.247 2.16667 10.5833 6.83037 10.5833 12.5833C10.5833 18.3363 15.247 23 20.9999 23Z"
							strokeWidth="2"/>
						<path
							d="M31.4166 27.1667H32.15C33.673 27.1671 35.1435 27.7237 36.2852 28.7318C37.4269 29.74 38.1611 31.1303 38.35 32.6417L39.1645 39.15C39.2378 39.7363 39.1855 40.3315 39.0112 40.8961C38.8369 41.4606 38.5444 41.9817 38.1533 42.4246C37.7623 42.8675 37.2814 43.2222 36.7428 43.465C36.2041 43.7079 35.62 43.8335 35.0291 43.8333H6.9708C6.37993 43.8335 5.79579 43.7079 5.25714 43.465C4.7185 43.2222 4.23767 42.8675 3.84658 42.4246C3.45548 41.9817 3.16306 41.4606 2.98872 40.8961C2.81438 40.3315 2.76211 39.7363 2.83538 39.15L3.64788 32.6417C3.83683 31.1296 4.57166 29.7387 5.7142 28.7305C6.85673 27.7222 8.32825 27.1661 9.85205 27.1667H10.5833"
							strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
					</svg>
				</Link>
			</div>
		</div>
	);
};