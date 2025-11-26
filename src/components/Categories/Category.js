import React, { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
import { useGetProductsQuery } from '../../features/api/apiSlice';
import { useSelector } from 'react-redux';

import Products from '../../components/Products/Products';

import styles from './category.module.scss';

const Category = () => {
	const { id } = useParams();
	// беру категории из стора, чтобы отображались в заголовке h2 (cat)
	const { list } = useSelector(({ categories }) => categories);

	const defaultValues = {
		title: '',
		price_min: 0,
		price_max: 0,
	};
	const defaultParams = {
		categoryId: id,
		limit: 8,
		offset: 0,
		...defaultValues,
	};

	const [cat, setCat] = useState('');
	// const [items, setItems] = useState([]);
	const [values, setValues] = useState(defaultValues);
	const [params, setParams] = useState(defaultParams);

	const { data = [], isLoading, isSuccess } = useGetProductsQuery(params);

	useEffect(() => {
		if (!id) return;

		setParams({ ...defaultParams, categoryId: id });
	}, [id]);

	// useEffect(() => {
	// 	if (!isLoading) return;

	// 	const products = Object.values(data);

	// 	if (!products.length) return;

	// 	setItems((_items) => [..._items, ...products]);
	// }, [data, isLoading]);

	useEffect(() => {
		if (!id || !list.length) {
			setCat('');
			return;
		}

		const category = list.find((item) => item.id === Number(id));
		setCat(category?.name || 'Категория не найдена');
	}, [list, id]);

	const handleChange = ({ target: { value, name } }) => {
		setValues({ ...values, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault(); // чтоб не перезагружалась страничка при поиске

		setParams({ ...params, ...values });
	};

	return (
		<section className={styles.wrapper}>
			<h2 className={styles.title}>{cat}</h2>
			<form className={styles.filters} onSubmit={handleSubmit}>
				<div className={styles.filter}>
					<label>Название товара</label>
					<input
						type="text"
						name="title"
						onChange={handleChange}
						placeholder="Введите название"
						value={values.title}
					/>
				</div>
				<div className={styles.filter}>
					<label>Минимальная цена</label>
					<input
						type="number"
						name="price_min"
						onChange={handleChange}
						placeholder="0"
						value={values.price_min || ''}
					/>
				</div>
				<div className={styles.filter}>
					<label>Максимальная цена</label>
					<input
						type="number"
						name="price_max"
						onChange={handleChange}
						placeholder="100000"
						value={values.price_max || ''}
					/>
				</div>

				<button type="submit" className={styles.submitBtn}>
					Применить
				</button>
			</form>
			{isLoading ? (
				<div className="preloader">Загрузка...</div>
			) : !isSuccess || !data.length ? (
				<div className={styles.back}>
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
