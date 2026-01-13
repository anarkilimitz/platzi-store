import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { removeItemFromLiked } from '../../features/user/userSlice';

import styles from './liked.module.scss';

const Liked = () => {
	const dispatch = useDispatch();

	const { liked } = useSelector(({ user }) => user); // беру товыры из user

	const handleRemove = (id) => {
		dispatch(removeItemFromLiked(id));
	};

	return (
		<section className={styles.liked}>
			<h2 className={styles.title}>Понравившиеся товары</h2>

			{!liked.length ? (
				<div className={styles.empty}>Нет понравившихся</div>
			) : (
				<>
					<div className={styles.list}>
						{liked.map((item) => {
							const { title, category, images, price, id } = item;

							return (
								<div className={styles.item} key={id}>
									<div
										className={styles.image}
										style={{ backgroundImage: `url(${images[0]})` }}
									/>
									<div className={styles.info}>
										<h3 className={styles.name}>{title}</h3>
										<div className={styles.category}>{category.name}</div>
									</div>

									<div className={styles.price}>{price}$</div>

									<div
										className={styles.trash}
										onClick={() => handleRemove(id)}
									>
										<svg className={styles.icon}>
											<use
												xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#trash`}
											/>
										</svg>
									</div>
								</div>
							);
						})}
					</div>
				</>
			)}
		</section>
	);
};

export default Liked;

// не забывать прописывать в Routes чтобы появилось!
