import { configureStore, applyMiddleware } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import {rootReducer} from './reducer';

const store = configureStore({
    reducer : rootReducer, 
    // middleware : applyMiddleware(thunk)
});

export default store;
