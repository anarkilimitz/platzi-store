import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useGetProductQuery } from '../../features/api/apiSlice';

import { ROUTES } from '../../utils/routes';

const SingleProduct = () => {
	const { id } = useParams();
	const navigate = useNavigate();

	const { data, isLoading, isFetching, isSuccess } = useGetProductQuery({ id });

	useEffect(() => {
		if (!isLoading && !isFetching && !isSuccess) {
			navigate(ROUTES.HOME); // чтобы кидало на главную, если нет такого id
		}
	}, [isLoading, isFetching, isSuccess, navigate]);

	return <div>SingleProduct</div>;
};

export default SingleProduct;
