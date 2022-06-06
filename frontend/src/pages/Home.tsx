import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Categories } from '../components/Categories';
import {
	selectActiveCategory,
	selectActiveSortType,
	selectCategories,
	selectSearchValue,
	selectSortTypes
} from '../store/filter/selectors';
import { useAppDispatch } from '../store/store';
import { setActiveCategory, setActiveSortType } from '../store/filter/slice';
import { findCategories } from '../store/filter/asyncActions';
import { Sort } from '../components/Sort';
import { findAllPizzas } from '../store/pizza/asyncActions';
import { setItemsByFilters } from '../store/pizza/slice';
import { selectPizzaStatus, selectPizzaViews } from '../store/pizza/selectors';
import { Skeleton } from '../components/PizzaBlockSkeleton';
import { PizzaBlock } from '../components/PizzaBlock';
import { findOrders } from '../store/pizzaOrder/asyncActions';
import { Status } from '../store/types';


export const Home: React.FC = () => {
	const dispatch = useAppDispatch();
	const categories = useSelector(selectCategories);
	const activeCategory = useSelector(selectActiveCategory);
	const sortTypes = useSelector(selectSortTypes);
	const activeSortType = useSelector(selectActiveSortType);
	const pizzas = useSelector(selectPizzaViews);
	const pizzasStatus = useSelector(selectPizzaStatus);
	const searchValue = useSelector(selectSearchValue);

	useEffect(() => {
		dispatch(findCategories());
		dispatch(findAllPizzas());
		dispatch(findOrders());
	}, []);

	useEffect(() => {
		dispatch(setItemsByFilters({
			category: activeCategory,
			sortType: activeSortType,
			searchText: searchValue
		}));
	}, [activeCategory, activeSortType, searchValue]);

	const changeActiveCategoryHandler = (category: string | null) => {
		dispatch(setActiveCategory(category));
	};

	const changeActiveSortTypeHandler = (sortType: string) => {
		dispatch(setActiveSortType(sortType));
	};

	const pizzaSkeletons = [...new Array(6)].map((_, i) => <Skeleton key={i}/>);

	const pizzaBlocks = pizzas.map((pizza, i) => <PizzaBlock key={`${pizza.title}_${i}`}
															 title={pizza.title}
															 imageUrl={pizza.imageUrl}
															 types={pizza.type}
															 sizes={pizza.size}/>);

	return (
		<div className="container">
			<div className="content__top">
				<Categories categories={categories}
							activeCategory={activeCategory}
							changeActiveCategoryHandler={changeActiveCategoryHandler}/>
				<Sort sortTypes={sortTypes}
					  activeSortType={activeSortType}
					  changeActiveSortTypeHandler={changeActiveSortTypeHandler}/>
			</div>

			<h2 className="content__title">Все пиццы</h2>

			{
				pizzasStatus === Status.ERROR &&
                <div className="content__error-info">
                    <h2>Произошла ошибка 😕</h2>
                    <p>К сожалению, не удалось получить питсы. Попробуйте повторить попытку позже.</p>
                </div>
			}

			<div className="content__items">
				{
					pizzasStatus === Status.SUCCESS ? pizzaBlocks : pizzaSkeletons
				}
			</div>
		</div>
	);
};