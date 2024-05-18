import { combineReducers } from 'redux';
import { ADD_TOKEN, REMOVE_TOKEN, ALL_USERS, UPDATE_USER } from './actions';

const initialState = {
    token: null,
    users : []
}

const tokenReducer = (state = initialState, action) => {
    if(action.type === ADD_TOKEN){
        return {
            ...state,
            token: action.payload,
        }
    }
    else if(action.type === REMOVE_TOKEN){
        return {
            ...state,
            token: null,
        }
    }
    else if(action.type === ALL_USERS){
        return {
            ...state,
            users: action.payload,
        }
    }
    else {
        return initialState
    }
};

const usersReducer = (state = initialState, action) => {
    if (action.type === ALL_USERS) {
        return {
            ...state,
            users: action.payload,
        };
    } else if (action.type === UPDATE_USER) {
        const { id, field, value } = action.payload;

        const userIndex = state.users.findIndex(user => user.id === id);

        if (userIndex === -1) {
            return state;
        }

        const updatedUser = {
            ...state.users[userIndex],
            [field]: value,
        };

        const updatedUsers = [
            ...state.users.slice(0, userIndex),
            updatedUser,
            ...state.users.slice(userIndex + 1),
        ];

        return {
            ...state,
            users: updatedUsers,
        }
    } else {
        return state;
    }
};

export const rootReducer = combineReducers({
    token: tokenReducer,
    users : usersReducer
});