import React from 'react';
import { Link } from 'react-router-dom';

import styles from './header.module.scss';

import { ROUTES } from '../../utils/routes';

import LOGO from '../../components/styles/logo/icon.png';
import AVATAR from '../../components/styles/avatar/avatar.jpeg';

const Header = () => {
	return (
		<div className={styles.header}>
			<div className={styles.logo}>
				<Link to={ROUTES.HOME}>
					<img src={LOGO} alt="Logo"></img>
				</Link>
			</div>

			<div className={styles.info}>
				<div className={styles.user}>
					<div
						className={styles.avatar}
						style={{ backgroundImage: `url(${AVATAR})` }}
					/>
					<div className={styles.username}>Guest</div>
				</div>
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
							onChange={() => {}}
							value=""
						/>
					</div>
					{false && <div className={styles.box}></div>}
				</form>
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
						<span className={styles.count}>2</span>
					</Link>
				</div>
			</div>
		</div>
	);
};
export default Header;
