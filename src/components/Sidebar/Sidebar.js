import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import styles from './sidebar.module.scss';

const Sidebar = () => {
	const { list } = useSelector(({ categories }) => categories);

	return (
		<section className={styles.sidebar}>
			<div className={styles.title}>CATEGORIES</div>
			<nav>
				<ul className={styles.menu}>
					{list.map(({ id, name }) => (
						<li key={id}>
							<NavLink
								className={({ isActive }) =>
									`${styles.link} ${isActive ? styles.active : 'null'}`
								}
								to={`/categories/${id}`}
							>
								{name}
							</NavLink>
						</li>
					))}
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
