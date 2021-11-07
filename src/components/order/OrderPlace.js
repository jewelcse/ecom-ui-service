import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'


const OrderPlace = ({cart}) => {

    

    return(

    <div>OrderPlace</div>
    )

}

const mapStateToProps = state => {
    return {
        cart: state.shop.cart
    }
}



export default connect(mapStateToProps)(OrderPlace)
