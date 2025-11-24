import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../features/user/userSlice';

import styles from './profile.module.scss';

const Profile = () => {
	const dispatch = useDispatch();

	const { currentUser } = useSelector(({ user }) => user);

	const [values, setValues] = useState({
		name: '',
		email: '',
		password: '',
		avatar: '',
	});
	// если currentUser то добавляются данные этого юзера в форму
	useEffect(() => {
		if (!currentUser) return;

		setValues(currentUser);
	}, [currentUser]);

	const handleChange = ({ target: { value, name } }) => {
		setValues({ ...values, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const isNotEmpty = Object.values(values).some((val) => !val);

		if (isNotEmpty) return;

		dispatch(updateUser(values));
	};

	return (
		<section className={styles.profile}>
			{/* если юзер заходит по такому роуту и не зареган - выдать сообщение */}
			{!currentUser ? (
				<span>Вы должны зарегистрироваться</span>
			) : (
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
							placeholder="Ваш аватар в виде URL-адреса"
							name="avatar"
							value={values.avatar}
							autoComplete="off"
							required
							onChange={handleChange}
						/>
					</div>

					<button type="submit" className={styles.submit}>
						Обновить
					</button>
				</form>
			)}
		</section>
	);
};

export default Profile;
