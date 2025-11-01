import React from 'react';
import { Link } from 'react-router-dom';

import styles from './header.module.scss';

import { ROUTES } from '../../utils/routes';

import LOGO from '../../components/styles/logo/logosportify.jpg';
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
			</div>
		</div>
	);
};
export default Header;
