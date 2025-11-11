import React from 'react';

import styles from './product.module.scss';

import { Link } from 'react-router-dom';

import { ROUTES } from '../../utils/routes';

const SIZES = [4, 4.5, 5];

const Product = ({ title, price, images, description }) => {
	const currentImage = images[0];

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
							onClick={() => {}}
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
							<div key={size} className={`${styles.size}`} onClick={() => {}}>
								{size}
							</div>
						))}
					</div>
				</div>
				<p className={styles.description}>{description}</p>

				<div className={styles.action}>
					<button className={styles.add}>Добавить в корзину</button>
					<button className={styles.favourite}>Добавить в избранное</button>
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
