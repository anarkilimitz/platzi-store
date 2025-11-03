import React from 'react';

import styles from './sidebar.module.scss';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
	return (
		<section className={styles.sidebar}>
			<div className={styles.title}>CATEGORIES</div>
			<nav>
				<ul className={styles.menu}>
					<li>
						<NavLink to={`/categories/${1}`}>Link</NavLink>
					</li>
				</ul>
			</nav>

			<div className={styles.footer}>
				<a href="/help" target="_blank" className={styles.link}>
					Help
				</a>
				<a href="/terms" target="_blank" className={styles.link}>
					Terms & Conditions
				</a>
			</div>
		</section>
	);
};
export default Sidebar;
