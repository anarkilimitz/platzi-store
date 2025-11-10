import React from 'react';
import { useSelector } from 'react-redux';

import Poster from '../Poster/Poster';
import Products from '../Products/Products';
import Categories from '../Categories/Categories';
import Banner from '../Banner/Banner';

const Home = () => {
	const { products, categories } = useSelector((state) => state);

	return (
		<>
			<Poster />
			<Products products={products.list} amount={4} title="Тренды" />
			<Categories
				products={categories.list}
				amount={4}
				title="Стоит посмотреть"
			/>
			<Banner />
		</>
	);
};
export default Home;
