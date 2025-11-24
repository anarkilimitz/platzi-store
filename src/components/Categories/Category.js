import React, { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
import { useGetProductsQuery } from '../../features/api/apiSlice';
import Products from '../../components/Products/Products';

const Category = () => {
	const { id } = useParams();

	const defaultParams = {
		title: '',
		price_min: 0,
		price_max: 0,
		categoryId: id,
	};

	const [params, setParams] = useState(defaultParams);

	useEffect(() => {
		if (!id) return;

		setParams({ ...defaultParams, categoryId: id });
	}, [id]);

	const { data, isLoading, isSuccess } = useGetProductsQuery({ params });
	console.log('data:', data);

	return (
		<section className={StyleSheet.wrapper}>
			<h2 className={StyleSheet.title}>Товары</h2>
			<form className={StyleSheet.filters} onSubmit={() => {}}>
				<div className={StyleSheet.filter}>
					<input
						type="text"
						name="title"
						onChange={() => {}}
						placeholder="Название товара"
						value={params.title}
					/>
				</div>
				<div className={StyleSheet.filter}>
					<input
						type="number"
						name="price_min"
						onChange={() => {}}
						placeholder="0"
						value={params.price_min}
					/>
				</div>
				<div className={StyleSheet.filter}>
					<input
						type="number"
						name="price_max"
						onChange={() => {}}
						placeholder="0"
						value={params.price_max}
					/>
				</div>

				<button type="submit" hidden />
			</form>
			{isLoading ? (
				<div className="preloader">Загрузка...</div>
			) : !isSuccess || !data.length ? (
				<div className={StyleSheet.back}>
					<span>Нет результата</span>
					<button>Сброс</button>
				</div>
			) : (
				<Products
					title=""
					products={data}
					style={{ padding: 0 }}
					amount={data.length}
				/>
			)}
		</section>
	);
};

export default Category;
