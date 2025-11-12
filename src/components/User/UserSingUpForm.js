import React, { useState } from 'react';

import styles from './user.module.scss';

const UserSignUpForm = () => {
	const { values, setValues } = useState({
		name: '',
		email: '',
		password: '',
		avatar: '',
	});

	const handleChange = ({ target: { value, name } }) => {
		setValues({ ...values, [name]: value });
	};

	return (
		<div className={styles.wrapper}>
			<div className={styles.close}>
				<svg className={styles.icon}>
					<use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#close`} />
				</svg>
			</div>

			<div className={styles.title}>Зарегистрироваться</div>

			<form className={styles.form}>
				<div className={styles.group}>
					<input
						type="email"
						placeholder="Ваша почта"
						name="email"
						value={values.email}
						autoComplete="off"
						required
						onChange={handleChange}
					/>
				</div>
				<div className={styles.group}>
					<input
						type="name"
						placeholder="Ваше имя"
						name="name"
						value={values.name}
						autoComplete="off"
						required
						onChange={handleChange}
					/>
				</div>
				<div className={styles.group}>
					<input
						type="password"
						placeholder="Ваш пароль"
						name="password"
						value={values.password}
						autoComplete="off"
						required
						onChange={handleChange}
					/>
				</div>
				<div className={styles.group}>
					<input
						type="avatar"
						placeholder="Ваш аватар"
						name="avatar"
						value={values.avatar}
						autoComplete="off"
						required
						onChange={handleChange}
					/>
				</div>
				<div className={styles.link}>У меня уже есть аккаунт</div>
				<button className={styles.submit} type="submit">
					Создать аккаунт
				</button>
			</form>
		</div>
	);
};

export default UserSignUpForm;
