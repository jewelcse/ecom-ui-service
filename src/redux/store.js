
import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';


import rootReducer from './rootReducer'

const saveToLocalStorage = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('cart', serializedState);
    } catch (e) {
        console.log(e)
    }
}

const loadFromLocalStorage = () => {
    try {
        const serializedState = localStorage.getItem('cart');
        if (serializedState === null) return undefined
        return JSON.parse(serializedState)

    } catch (e) {
        console.log(e)
        return undefined
    }
}

const persistedState = loadFromLocalStorage();

const store = createStore(
    rootReducer,
    persistedState,
    composeWithDevTools(applyMiddleware(logger, thunk))
)
store.subscribe(() => saveToLocalStorage(store.getState()))

export default store;