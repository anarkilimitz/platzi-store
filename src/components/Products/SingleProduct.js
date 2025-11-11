import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useGetProductQuery } from '../../features/api/apiSlice';
import { ROUTES } from '../../utils/routes';

import Product from './Product';
import styles from '../../features/loading/loading.module.scss';

const SingleProduct = () => {
	const { id } = useParams();
	const navigate = useNavigate();

	const { data, isLoading, isFetching, isSuccess } = useGetProductQuery({ id });

	useEffect(() => {
		if (!isLoading && !isFetching && !isSuccess) {
			navigate(ROUTES.HOME);
		}
	}, [isLoading, isFetching, isSuccess, navigate]);

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

	return <Product {...data} />;
};

export default SingleProduct;
