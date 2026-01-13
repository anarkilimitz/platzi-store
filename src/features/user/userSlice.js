import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { BASE_URL } from '../../utils/constants';

// localStorage liked
const loadLikedFromStorage = () => {
	try {
		const data = localStorage.getItem('liked');
		return data ? JSON.parse(data) : [];
	} catch {
		return [];
	}
};

const saveLikedToStorage = (liked) => {
	localStorage.setItem('liked', JSON.stringify(liked));
};

// localStorage cart

const loadCartFromStorage = () => {
	try {
		const data = localStorage.getItem('cart');
		return data ? JSON.parse(data) : [];
	} catch {
		return [];
	}
};

const saveCartToStorage = (cart) => {
	localStorage.setItem('cart', JSON.stringify(cart));
};

// регистрация юзера
export const createUser = createAsyncThunk(
	'users/createUser',
	async (payload, thunkAPI) => {
		try {
			const res = await axios.post(`${BASE_URL}/users`, payload);
			return res.data;
		} catch (err) {
			// console.log(err);
			return thunkAPI.rejectWithValue(err);
		}
	}
);

// авторизация юзера
export const loginUser = createAsyncThunk(
	'users/loginUser',
	async (payload, thunkAPI) => {
		try {
			const res = await axios.post(`${BASE_URL}/auth/login`, payload);
			// console.log('Ответ от /auth/login:', res.data);
			const login = await axios(`${BASE_URL}/auth/profile`, {
				headers: {
					Authorization: `Bearer ${res.data.access_token}`,
				},
			});

			return login.data;
		} catch (err) {
			// console.log(err);
			return thunkAPI.rejectWithValue(err);
		}
	}
);

// обновление юзера
export const updateUser = createAsyncThunk(
	'users/updateUser',
	async (payload, thunkAPI) => {
		const state = thunkAPI.getState();
		const userId = state.user.currentUser.id; // беру id
		try {
			const res = await axios.put(`${BASE_URL}/users/${userId}`, payload);
			return res.data;
		} catch (err) {
			// console.log(err);
			return thunkAPI.rejectWithValue(err);
		}
	}
);

const addCurrentUser = (state, { payload }) => {
	state.currentUser = payload;
};

// для управления корзиной и юзером
const userSlice = createSlice({
	name: 'user',
	initialState: {
		currentUser: null,
		user: [],
		cart: loadCartFromStorage(),
		liked: loadLikedFromStorage(),
		isLoading: false,
		formType: 'signup',
		showForm: false,
	},

	reducers: {
		addItemToCart: (state, { payload }) => {
			let newCart = [...state.cart];
			const found = state.cart.find(({ id }) => id === payload.id);

			if (found) {
				newCart = newCart.map((item) => {
					return item.id === payload.id
						? { ...item, quantity: payload.quantity || item.quantity + 1 }
						: item;
				});
			} else newCart.push({ ...payload, quantity: 1 });

			state.cart = newCart;
			saveCartToStorage(state.cart);
		},
		removeItemFromCart: (state, action) => {
			state.cart = state.cart.filter((item) => item.id !== action.payload);
			saveCartToStorage(state.cart);
		},
		addItemToLiked: (state, { payload }) => {
			const exists = state.liked.find((item) => item.id === payload.id);
			if (!exists) {
				state.liked.push(payload);
				saveLikedToStorage(state.liked);
			}
		},
		removeItemFromLiked: (state, { payload }) => {
			state.liked = state.liked.filter((item) => item.id !== payload);
			saveLikedToStorage(state.liked);
		},
		toggleForm: (state, { payload }) => {
			state.showForm = payload;
		},
		toggleFormType: (state, { payload }) => {
			state.formType = payload;
		},
	},

	extraReducers: (builder) => {
		builder.addCase(createUser.fulfilled, addCurrentUser);
		builder.addCase(loginUser.fulfilled, addCurrentUser);
		builder.addCase(updateUser.fulfilled, addCurrentUser);
	},
});

export const {
	addItemToCart,
	removeItemFromCart,
	addItemToLiked,
	removeItemFromLiked,
	toggleForm,
	toggleFormType,
} = userSlice.actions;

export default userSlice.reducer;
