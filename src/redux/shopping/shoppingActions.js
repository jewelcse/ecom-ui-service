
import * as actionTypes from './shoppingTypes'

export const setProducts = products => {
    return {
        type: actionTypes.SET_PRODUCTS,
        payLoad: products
    }
}

export const addToWishlist = id => {
    return {
        type: actionTypes.ADD_TO_WISHLIST,
        payLoad: {
            id: id
        }
    }
}

export const removeFromWishlist = id => {
    return {
        type: actionTypes.REMOVE_FROM_WISHLIST,
        payLoad: {
            id: id
        }
    }
}

export const addToCart = id => {
    return {
        type: actionTypes.ADD_TO_CART,
        payLoad: {
            id: id
        }
    }
}

export const removeFromCart = id => {
    return {
        type: actionTypes.REMOVE_FROM_CART,
        payLoad: {
            id: id
        }
    }
}

export const adjustQty = (id, value) => {
    return {
        type: actionTypes.ADJUST_QTY,
        payLoad: {
            id: id,
            qty: value
        }
    }
}