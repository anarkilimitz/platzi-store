import React from 'react';
import { Link } from 'react-router-dom';

import styles from './footer.module.scss';
import { ROUTES } from '../../utils/routes';

import LOGO from '../../components/styles/logo/icon.png';

const Footer = () => (
	<section className={styles.footer}>
		<div className={styles.logo}>
			<Link to={ROUTES.HOME}>
				<img src={LOGO} alt="Logo"></img>
			</Link>
		</div>

		<div className={styles.rights}>
			Developed by {''}
			<a href="https://portfolio.limitz.ru" target="_blank" rel="noreferrer">
				Евгений
			</a>
		</div>

		<div className={styles.social}>
			<a href="https://instagram.com" target="_blank" rel="noreferrer">
				<svg className={styles.icon}>
					<use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#instagram`} />
				</svg>
			</a>
			<a href="https://facebook.com" target="_blank" rel="noreferrer">
				<svg className={styles.icon}>
					<use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#facebook`} />
				</svg>
			</a>
			<a href="https://twitter.com" target="_blank" rel="noreferrer">
				<svg className={styles.icon}>
					<use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#twitter`} />
				</svg>
			</a>
		</div>
	</section>
);

export default Footer;
