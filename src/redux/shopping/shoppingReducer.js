import * as actionTypes from './shoppingTypes'


const initialState = {
    products: [],
    cart: [],
    wishList: []
}


const shopReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_PRODUCTS: return {
            ...state,
            products: action.payLoad
        }

        case actionTypes.ADD_TO_WISHLIST: return {
            ...state,
            wishList: action.payLoad
        }

        case actionTypes.ADD_TO_CART:
            // get the items from the product array    
            const item = state.products.find(product => product.id === action.payLoad.id);
            // check if item in cart already or not
            const inCart = state.cart.find(item => item.id === action.payLoad.id ? true : false);

            return {
                ...state,
                cart: inCart ? state.cart.map(item => item.id === action.payLoad.id ?
                    { ...item, qty: item.qty + 1 } : item)
                    : [...state.cart, { ...item, qty: 1 }]

            }
        case actionTypes.REMOVE_FROM_CART:

            return {
                ...state,
                cart: state.cart.filter(item => item.id !== action.payLoad.id)
            }
        case actionTypes.ADJUST_QTY:
            return {

                ...state,
                cart: state.cart.map(item => item.id === action.payLoad.id ? { ...item, qty: +action.payLoad.qty } : item)
            }
        default: return state
    }
}

export default shopReducer