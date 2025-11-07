import React from 'react';

import styles from '../../components/Home/home.module.scss';

import BG from '../../components/styles/images/banner.png';

const Poster = () => (
	<section className={styles.home}>
		<div className={styles.title}>BIG SALE 35%</div>
		<div className={styles.product}>
			<div className={styles.text}>
				<div className={styles.subtitle}>the best products of 2025</div>
				<h1 className={styles.head}>
					Gaming Graphics Card XFX SPEEDSTER MERCURY 310 AMD Radeon RX 7900 XT
				</h1>
				<button className={styles.button}>Shop now</button>
			</div>
			<div className={styles.image}>
				<img src={BG} alt="Poster" />
			</div>
		</div>
	</section>
);

export default Poster;
