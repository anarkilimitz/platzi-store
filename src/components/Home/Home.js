import React from 'react';
import { useSelector } from 'react-redux';
import Poster from '../Poster/Poster';
import Products from '../Products/Products';

const Home = () => {
	const { list } = useSelector(({ products }) => products);

	return (
		<>
			<Poster />
			<Products products={list} amount={4} title="Trending" />
		</>
	);
};
export default Home;
