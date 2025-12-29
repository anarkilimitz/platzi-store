import React, { useEffect, useState, useMemo } from 'react';

import { useParams } from 'react-router-dom';
import { useGetProductsQuery } from '../../features/api/apiSlice';
import { useSelector } from 'react-redux';

import Products from '../../components/Products/Products';

import styles from './category.module.scss';

const Category = () => {
	const { id } = useParams();
	// беру категории из стора, чтобы отображались в заголовке h2 (cat)
	const { list } = useSelector(({ categories }) => categories);

	const defaultValues = useMemo(
		() => ({
			title: '',
			price_min: 0,
			price_max: 0,
		}),
		[]
	);
	const defaultParams = useMemo(
		() => ({
			categoryId: id,
			limit: 8,
			offset: 0,
			...defaultValues,
		}),
		[id, defaultValues]
	);

	const [cat, setCat] = useState('');
	// хранит все уже загруженные товары
	const [items, setItems] = useState([]);

	const [values, setValues] = useState(defaultValues);
	const [params, setParams] = useState(defaultParams);

	const {
		data = [],
		isLoading,
		isFetching,
		isSuccess,
	} = useGetProductsQuery(params);

	useEffect(() => {
		if (!id) return;
		// сбрасывает параметры запроса
		setParams(defaultParams);
		setItems([]); // очищает старые товары при смене категории
		setValues(defaultValues); // очищает все фильтры при смене категории списка
	}, [id, defaultParams, defaultValues]);

	// догружает товары в общее состояние
	useEffect(() => {
		if (!data.length || isFetching) return;

		setItems((prev) => [...prev, ...data]);
	}, [data, isFetching]);

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

		setParams({ ...defaultParams, ...values });
		setItems([]); // сбрасывает при новых фильтрах
	};
	// догрузка товаров
	const loadMore = () => {
		setParams((prev) => ({ ...prev, offset: prev.offset + prev.limit }));
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
					<span>₽ от:</span>
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
					<span>₽ до:</span>
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
					products={items}
					style={{ padding: 0 }}
					amount={items.length}
				/>
			)}

			{data.length === params.limit && (
				<div className={styles.more}>
					<button onClick={loadMore} disabled={isFetching}>
						{isFetching ? 'Загрузка...' : 'Показать больше товаров'}
					</button>
				</div>
			)}
		</section>
	);
};

export default Category;
