
import { combineReducers } from 'redux';
import shopReducer from './shopping/shoppingReducer'

const rootReducer = combineReducers({
    shop: shopReducer
});

export default rootReducer;
