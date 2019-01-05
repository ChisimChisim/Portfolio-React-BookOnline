import {
    createStore as reduxCreateStore,
    combineReducers,
    applyMiddleware
} from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import * as reducers from '../reducers';

const persistConfig = {
    key: 'root',
    storage,
    whitelist:['LoginForm'],
}

export default function createStore(history){
    return reduxCreateStore(
        persistReducer(persistConfig,
        combineReducers({
           ...reducers,
           router: routerReducer,
        })),
        applyMiddleware(
            routerMiddleware(history),
            logger,
            thunk,
        ),
    );
}

