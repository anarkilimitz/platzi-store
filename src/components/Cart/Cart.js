import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
	addItemToCart,
	removeItemFromCart,
} from '../../features/user/userSlice';

import styles from './cart.module.scss';

const Cart = () => {
	const dispatch = useDispatch();

	const { cart } = useSelector(({ user }) => user); // беру товыры из user

	const totalPrice = cart.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0
	);

	const handleQuantityChange = (item, newQuantity) => {
		if (newQuantity < 1) return;
		dispatch(addItemToCart({ ...item, quantity: newQuantity }));
	};

	const handleRemove = (id) => {
		dispatch(removeItemFromCart(id));
	};

	return (
		<section className={styles.cart}>
			<h2 className={styles.title}>Ваша корзина</h2>

			{!cart.length ? (
				<div className={styles.empty}>Корзина пуста</div>
			) : (
				<>
					<div className={styles.list}>
						{cart.map((item) => {
							const { title, category, images, price, id, quantity } = item;

							return (
								<div className={styles.item} key={id}>
									<div
										className={styles.image}
										style={{ backgroundImage: `url(${images})` }}
									/>
									<div className={styles.info}>
										<h3 className={styles.name}>{title}</h3>
										<div className={styles.category}>{category.name}</div>
									</div>

									<div className={styles.price}>{price}$</div>

									<div className={styles.quantity}>
										<div
											className={styles.minus}
											onClick={
												() =>
													handleQuantityChange(item, Math.max(1, quantity - 1))
												// чтобы не было меньше 1
											}
										>
											<svg className={styles.icon}>
												<use
													xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#minus`}
												/>
											</svg>
										</div>

										<span>{quantity}</span>

										<div
											className={styles.plus}
											onClick={() => handleQuantityChange(item, quantity + 1)}
										>
											<svg className={styles.icon}>
												<use
													xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#plus`}
												/>
											</svg>
										</div>
									</div>

									<div className={styles.total}>{price * quantity}$</div>

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
					<div className={styles.action}>
						<div className={styles.total}>
							Итоговая цена: {''}
							<span>{totalPrice}$</span>
						</div>

						<button className={styles.proceed}>
							Перейти к оформлению заказа
						</button>
					</div>
				</>
			)}
		</section>
	);
};

export default Cart;

// не забывать прописывать в Routes чтобы появилось!
