import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { filterByPrice } from '../../features/products/productsSlice';

import Poster from '../Poster/Poster';
import Products from '../Products/Products';
import Categories from '../Categories/Categories';
import Banner from '../Banner/Banner';

const Home = () => {
	const dispatch = useDispatch();
	const {
		products: { list, filtered },
		categories,
	} = useSelector((state) => state);

	useEffect(() => {
		if (!list.length) return;

		dispatch(filterByPrice(30));
	}, [dispatch, list.length]);

	return (
		<>
			<Poster />
			<Products products={list} amount={4} title="Тренды" />
			<Categories
				products={categories.list}
				amount={6}
				title="Стоит посмотреть"
			/>
			<Banner />
			<Products products={filtered} amount={8} title="Товары до $30" />
		</>
	);
};
export default Home;
