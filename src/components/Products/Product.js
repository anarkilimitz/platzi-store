import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Link } from 'react-router-dom';

import { ROUTES } from '../../utils/routes';

import styles from './product.module.scss';
import { addItemToCart } from '../../features/user/userSlice';
import { addItemToLiked } from '../../features/user/userSlice';

const SIZES = [4, 4.5, 5];

const Product = (item) => {
	const { title, price, images, description } = item;

	const dispatch = useDispatch();

	const [currentImage, setCurrentImage] = useState();
	const [currentSize, setCurrentSize] = useState();

	useEffect(() => {
		if (!images.length) return;

		setCurrentImage(images[0]);
	}, [images]);

	const addToCart = () => {
		dispatch(addItemToCart(item));
	};

	const addToLiked = () => {
		dispatch(addItemToLiked(item));
	};

	return (
		<section className={styles.product}>
			<div className={styles.images}>
				<div
					className={styles.current}
					style={{ backgroundImage: `url(${currentImage})` }}
				/>
				<div className={styles['images-list']}>
					{images.map((image, i) => (
						<div
							key={i}
							className={styles.image}
							style={{ backgroundImage: `url(${image})` }}
							onClick={() => setCurrentImage(image)}
						/>
					))}
				</div>
			</div>
			<div className={styles.info}>
				<h1 className={styles.title}>{title}</h1>
				<div className={styles.price}>${price}</div>
				<div className={styles.color}>
					<span>Color:</span>Green
				</div>
				<div className={styles.sizes}>
					<span>Sizes:</span>

					<div className={styles.list}>
						{SIZES.map((size) => (
							<div
								key={size}
								className={`${styles.size} ${
									currentSize === size ? styles.active : ''
								}`}
								onClick={() => setCurrentSize(size)}
							>
								{size}
							</div>
						))}
					</div>
				</div>

				<p className={styles.description}>{description}</p>

				<div className={styles.action}>
					<button
						onClick={addToCart}
						className={styles.add}
						disabled={!currentSize}
					>
						Добавить в корзину
					</button>
					<button
						onClick={addToLiked}
						className={styles.favourite}
					>
						Добавить в избранное
					</button>
				</div>
				<div className={styles.bottom}>
					<div className={styles.purchase}>19 покупок совершено</div>

					<Link to={ROUTES.HOME}>Вернуться в магазин</Link>
				</div>
			</div>
		</section>
	);
};

export default Product;
