export const ADD_TOKEN = "ADD_TOKEN";
export const REMOVE_TOKEN = "REMOVE_TOKEN";
export const ALL_USERS = "ALL_USERS";
export const UPDATE_USER = "UPDATE_USER";

export const addToken = (token) => ({
	type: ADD_TOKEN,
	payload: token,
})

export const removeToken = () => ({
	type: REMOVE_TOKEN,
	payload: null,
})

export const allUsers = (users) => ({
	type: ALL_USERS,
	payload: users,
})

export const updateUser = (item) => ({
	type: UPDATE_USER,
	payload: item,
})
