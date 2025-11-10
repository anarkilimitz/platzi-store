import React from 'react';

import styles from '../../components/Banner/banner.module.scss';

import BG from '../../components/styles/images/fake-api.png';

const Banner = () => (
	<section className={styles.home}>
		<div className={styles.title}>BIG SALE 20%</div>
		<div className={styles.product}>
			<div className={styles.text}>
				<div className={styles.subtitle}>the streetwear essentials of 2025</div>
				<h1 className={styles.head}>
					Oversized T-Shirt URBAN CLASSIC HEAVYWEIGHT 340GSM
				</h1>
				<button className={styles.button}>Shop now</button>
			</div>
			<div className={styles.image}>
				<img src={BG} alt="Banner" />
			</div>
		</div>
	</section>
);

export default Banner;
