import React from 'react';


interface IStatisticPizzaBlockProps {
	id: number;
	title: string;
	image: string;
	type: string;
	size: number;
	category: string;
	price: number;
	rating: number;
	ordersCount: number;
}

export const StatisticPizzaBlock: React.FC<IStatisticPizzaBlockProps> = ({
																			 id, title, image,
																			 type, size, category,
																			 price, rating, ordersCount
																		 }) => {
	return (
		<div className="pizza-block-wrapper">
			<div className="pizza-block">
				<img className="pizza-block__image" src={image} alt={title} width={260} height={260}/>
				<h4 className="pizza-block__title">{title}</h4>
				<div className="pizza-block__selector__statistic">
					<ul>
						<li className={'active'}>{type}</li>
					</ul>
					<ul>
						<li className={'active'}>{size} см.</li>
					</ul>
					<ul>
						<li className={'active'}>{category}</li>
					</ul>
					<ul>
						<li className={'active'}>{price} ₽</li>
					</ul>
					<ul>
						<li className={'active flex__field'}>
							{rating}
							<svg width="14" height="14" viewBox="0 0 16 16" fill="none"
								 xmlns="http://www.w3.org/2000/svg">
								<path
									d="M14.8375 5.61687L10.3408 4.93252L8.33066 0.665069C8.27575 0.548229 8.18543 0.453644 8.07385 0.396151C7.79403 0.251491 7.45398 0.372041 7.31407 0.665069L5.30392 4.93252L0.807214 5.61687C0.68324 5.63541 0.569892 5.69662 0.483111 5.78935C0.378197 5.90227 0.320384 6.05419 0.322377 6.21172C0.324369 6.36925 0.386004 6.51951 0.493737 6.62948L3.74717 9.95108L2.97853 14.6414C2.9605 14.7505 2.97203 14.8627 3.01181 14.9653C3.05159 15.0679 3.11802 15.1568 3.20357 15.2218C3.28913 15.2869 3.39038 15.3256 3.49585 15.3334C3.60132 15.3413 3.70679 15.3181 3.8003 15.2664L7.82236 13.052L11.8444 15.2664C11.9542 15.3276 12.0818 15.348 12.204 15.3257C12.5121 15.2701 12.7193 14.9641 12.6662 14.6414L11.8976 9.95108L15.151 6.62948C15.2395 6.53861 15.298 6.41991 15.3157 6.29009C15.3635 5.96553 15.1474 5.66509 14.8375 5.61687V5.61687ZM10.5285 9.48372L11.1679 13.384L7.82236 11.5442L4.47684 13.3858L5.11619 9.48558L2.41002 6.72221L6.15049 6.15285L7.82236 2.60499L9.49424 6.15285L13.2347 6.72221L10.5285 9.48372Z"
									fill="black"/>
							</svg>
						</li>
					</ul>
					<ul>
						<li className={'active flex__field'}>
							{ordersCount}
							<svg width="14" height="14" viewBox="0 0 16 16" fill="none"
								 xmlns="http://www.w3.org/2000/svg">
								<path
									d="M3.40192 4.36111H13.6766C13.8848 4.36112 14.0906 4.40667 14.2809 4.49481C14.4712 4.58296 14.6417 4.71176 14.7814 4.8729C14.9211 5.03404 15.0269 5.22395 15.092 5.43038C15.1571 5.63682 15.18 5.8552 15.1593 6.07144L14.7122 10.7381C14.6755 11.1219 14.5034 11.4778 14.2294 11.7367C13.9554 11.9955 13.5991 12.1389 13.2295 12.1389H6.11401C5.76939 12.139 5.43537 12.0145 5.16883 11.7864C4.90229 11.5584 4.71971 11.241 4.65216 10.8882L3.40192 4.36111Z"
									stroke="black" strokeWidth="1.5" strokeLinejoin="round"/>
								<path
									d="M11.5978 15.25H13.088M3.40193 4.36111L2.79841 1.83878C2.75805 1.67059 2.66501 1.5213 2.53406 1.41462C2.40312 1.30795 2.24178 1.25 2.07568 1.25H1.16669L3.40193 4.36111ZM5.63717 15.25H7.12733H5.63717Z"
									stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
							</svg>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};