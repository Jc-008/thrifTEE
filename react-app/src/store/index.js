import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import session from "./session"
import productsReducer from "./products"
import categoryReducer from "./category"
import cartReducer from "./cart"
import searchReducer from './search'
import orderReducer from './order'

const rootReducer = combineReducers({
    session,
    products: productsReducer,
    category: categoryReducer,
    cart: cartReducer,
    search: searchReducer,
    orders: orderReducer

});


let enhancer;

if (process.env.NODE_ENV === 'production') {
    enhancer = applyMiddleware(thunk);
} else {
    const logger = require('redux-logger').default;
    const composeEnhancers =
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

// const configureStore = (preloadedState) => {
//     return createStore(rootReducer, preloadedState, enhancer);
// };


const persistedState = localStorage.getItem('cart')
    ? JSON.parse(localStorage.getItem('cart'))
    : []

const configureStore = (persistedState) => {
    return createStore(rootReducer, persistedState, enhancer)
}

export default configureStore;
