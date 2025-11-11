import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { useGetProductQuery } from '../../features/api/apiSlice';
import { ROUTES } from '../../utils/routes';

import { getRelatedProducts } from '../../features/products/productsSlice';

import Product from './Product';
import Products from './Products';
import styles from '../../features/loading/loading.module.scss';

const SingleProduct = () => {
	const dispatch = useDispatch();
	const { id } = useParams();
	const navigate = useNavigate();
	const { list, related } = useSelector(({ products }) => products);

	const { data, isLoading, isFetching, isSuccess } = useGetProductQuery({ id });

	useEffect(() => {
		if (!isLoading && !isFetching && !isSuccess) {
			navigate(ROUTES.HOME);
		}
	}, [isLoading, isFetching, isSuccess, navigate]);

	useEffect(() => {
		if (!data || !list.length) return;

		dispatch(getRelatedProducts(data.category.id));
	}, [data, dispatch, list.length]);

	if (isLoading) {
		return (
			<div className={styles.loaderWrapper}>
				<div className={styles['lds-hourglass']}></div>
			</div>
		);
	}

	if (!data) {
		return <section className="preloader">Loading...</section>;
	}

	return (
		<>
			<Product {...data} />;
			<Products products={related} amount={8} title="Сопутствующие товары" />
		</>
	);
};

export default SingleProduct;
