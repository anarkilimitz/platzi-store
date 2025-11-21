import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import styles from './user.module.scss';
import { loginUser } from '../../features/user/userSlice';

const UserLoginForm = ({ toggleCurrentFormType, closeForm }) => {
	const dispatch = useDispatch();
	const [values, setValues] = useState({
		email: '',
		password: '',
	});

	const handleChange = ({ target: { value, name } }) => {
		setValues({ ...values, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const isNotEmpty = Object.values(values).some((val) => !val);
		if (isNotEmpty) return;
		dispatch(loginUser(values));
		closeForm();
	};

	return (
		<div className={styles.wrapper}>
			<div className={styles.close} onClick={closeForm}>
				<svg className={styles.icon}>
					<use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#close`} />
				</svg>
			</div>

			<div className={styles.title}>Авторизоваться</div>

			<form className={styles.form} onSubmit={handleSubmit}>
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
						type="password"
						placeholder="Ваш пароль"
						name="password"
						value={values.password}
						autoComplete="off"
						required
						onChange={handleChange}
					/>
				</div>

				<div
					className={styles.link}
					onClick={() => toggleCurrentFormType('signup')}
				>
					Создать аккаунт
				</div>

				<button className={styles.submit} type="submit">
					Авторизоваться
				</button>
			</form>
		</div>
	);
};

export default UserLoginForm;
