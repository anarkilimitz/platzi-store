import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { filterByPrice } from '../../features/products/productsSlice';

import Poster from '../Poster/Poster';
import Products from '../Products/Products';
import Categories from '../Categories/Categories';
import Banner from '../Banner/Banner';

const Home = () => {
	const dispatch = useDispatch();
	//исправлена ошибка - в Redux переписывылся весь стейт целиком. заменил на 3 строки
	const productsList = useSelector((state) => state.products.list);
	const filtered = useSelector((state) => state.products.filtered);
	const categoriesList = useSelector((state) => state.categories.list);

	useEffect(() => {
		if (!productsList.length) return;
		dispatch(filterByPrice(30));
	}, [dispatch, productsList.length]);

	return (
		<>
			<Poster />
			<Products products={productsList} amount={4} title="Тренды" />
			<Categories
				products={categoriesList}
				amount={6}
				title="Стоит посмотреть"
			/>
			<Banner />
			<Products products={filtered} amount={8} title="Товары до $30" />
		</>
	);
};

export default Home;
