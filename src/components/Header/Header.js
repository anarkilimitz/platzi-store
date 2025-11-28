import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import styles from './header.module.scss';

import { ROUTES } from '../../utils/routes';

import LOGO from '../../components/styles/logo/icon.png';
import AVATAR from '../../components/styles/avatar/avatar.jpeg';

import { toggleForm } from '../../features/user/userSlice';
import { useGetProductsQuery } from '../../features/api/apiSlice';

const Header = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [searchValue, setSearchValue] = useState('');
	const { currentUser, cart } = useSelector(({ user }) => user);

	const [values, setValues] = useState({ name: 'Гость', avatar: AVATAR });

	const { data, isLoading } = useGetProductsQuery({ title: searchValue });
	// console.log(data);

	useEffect(() => {
		if (!currentUser) return;

		setValues(currentUser);
	}, [currentUser]);

	const handleClick = () => {
		if (!currentUser) dispatch(toggleForm(true));
		else navigate(ROUTES.PROFILE);
	};

	const handleSearch = ({ target: { value } }) => {
		setSearchValue(value);
	};

	return (
		<div className={styles.header}>
			<div className={styles.logo}>
				<Link to={ROUTES.HOME}>
					<img src={LOGO} alt="Logo"></img>
				</Link>
			</div>

			<div className={styles.info}>
				<form className={styles.form}>
					<div className={styles.icon}>
						<svg className={styles.icon}>
							<use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#search`} />
						</svg>
					</div>
					<div className={styles.input}>
						<input
							type="search"
							name="search"
							placeholder="Search for anything..."
							autoComplete="off"
							onChange={handleSearch}
							value={searchValue}
						/>
					</div>
					{searchValue && (
						<div className={`${styles.box} ${styles.active}`}>
							{isLoading
								? 'Загрузка...'
								: !data.length
								? 'Нет результата'
								: data.map(({ title, images, id }) => {
										return (
											<Link
												key={id}
												className={styles.item}
												to={`/products/${id}`}
												onClick={() => setSearchValue('')} //очистка после клика
											>
												<div
													className={styles.image}
													style={{ backgroundImage: `url(${images[0]})` }}
												/>
												<div className={styles.title}>{title}</div>
											</Link>
										);
								  })}
						</div>
					)}
				</form>
				<div className={styles.user} onClick={handleClick}>
					<div
						className={styles.avatar}
						style={{ backgroundImage: `url(${values.avatar})` }}
					/>
					<div className={styles.username}>{values.name}</div>
				</div>
				<div className={styles.account}>
					<Link to={ROUTES.HOME} className={styles.favourites}>
						<svg className={styles.icon}>
							<use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#heart`} />
						</svg>
					</Link>

					<Link to={ROUTES.CART} className={styles.cart}>
						<svg className={styles.icon}>
							<use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#cart`} />
						</svg>
						{!!cart.length && <span className={styles.count}>{cart.length}</span>}
					</Link>
				</div>
			</div>
		</div>
	);
};
export default Header;
