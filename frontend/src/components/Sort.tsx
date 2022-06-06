import React, { useEffect, useRef, useState } from 'react';


interface ISortProps {
	sortTypes: string[];
	activeSortType: string | null;
	changeActiveSortTypeHandler: (param: string) => void;
}

export const Sort: React.FC<ISortProps> = ({sortTypes, activeSortType, changeActiveSortTypeHandler}) => {
	const sortRef = useRef<HTMLDivElement>(null);
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const setActiveSortTypeHandler = (sortType: string) => {
		setIsOpen(false);
		changeActiveSortTypeHandler(sortType);
	};

	const outsideClickHandler = (e: MouseEvent): void => {
		if (!sortRef.current?.contains(e.target as Node)) {
			setIsOpen(false);
		}
	};

	useEffect(() => {
		document.body.addEventListener('click', outsideClickHandler);

		return () => {
			document.body.removeEventListener('click', outsideClickHandler);
		};
	}, []);

	return (
		<div ref={sortRef} className="sort">
			<div className="sort__label">
				<b>Сортировка по:</b>
				<span onClick={() => setIsOpen(!isOpen)}>{activeSortType}</span>
			</div>
			{
				isOpen && (
					<div className="sort__popup">
						<ul>
							{
								sortTypes.map((sortType, i) => (
									<li key={i}
										onClick={() => setActiveSortTypeHandler(sortType)}
										className={sortType === activeSortType ? 'active' : ''}>
										{sortType}
									</li>
								))
							}
						</ul>
					</div>
				)
			}
		</div>
	);
};