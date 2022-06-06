import React from 'react';
import { useSelector } from 'react-redux';
import { selectTopCategory } from '../store/filter/selectors';


interface ICategoriesProps {
	categories: string[];
	activeCategory: string | null;
	changeActiveCategoryHandler: (param: string | null) => void;
}

export const Categories: React.FC<ICategoriesProps> = ({categories, activeCategory, changeActiveCategoryHandler}) => {
	const topCategory = useSelector(selectTopCategory);

	return (
		<div className="categories">
			<ul>
				<li key={0} onClick={() => changeActiveCategoryHandler(null)}
					className={activeCategory === null ? 'active' : ''}>Все
				</li>
				{
					categories.map((category, i) => (
						<li key={i + 1}
							onClick={() => changeActiveCategoryHandler(category)}
							className={category === topCategory && category === activeCategory ?
								'top-category active' : category === activeCategory ?
									'active' : category === topCategory ?
										'top-category' : ''}>
							{category}
						</li>
					))
				}
			</ul>
		</div>
	);
};