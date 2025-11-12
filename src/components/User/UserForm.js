import React from 'react';
import { useSelector } from 'react-redux';
import UserSignUpForm from './UserSingUpForm';

import styles from './user.module.scss';

const UserForm = () => {
	const { showForm } = useSelector(({ user }) => user);

	return showForm ? (
		<>
			<div className={styles.overlay} />
			<UserSignUpForm />
		</>
	) : null;
};

export default UserForm;
