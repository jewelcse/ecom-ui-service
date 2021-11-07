import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { removeFromCart } from '../../redux/shopping/shoppingActions'
import './Cart.css'
import CartItem from './CartItem'
import { Link } from 'react-router-dom';

import { Container, Col, Row, Toast,OverlayTrigger,Tooltip,Alert } from 'react-bootstrap'
import useLocalStorage from '../../localStorage'

const Cart = ({ cart }) => {

    const [totalPrice, setTotalPrice] = useState(0);
    const [subTotal, setSubtotal] = useState(0);
    const [shippingCharge, setShippingCharge] = useState(50);
    const [totalItem, setTotalItem] = useState(0);
    const [cartData, setCartData] = useState();

    



    useEffect(() => {

        let items = 0;
        let price = 0;
        cart.forEach(item => {
            items += item.qty;
            console.log(item.productFinalPrice)
            price += (item.qty * item.productFinalPrice)
        });

        setTotalItem(items);
        setSubtotal(price);
        setTotalPrice(price+shippingCharge)
       
    }, [cart,totalItem,totalPrice,setTotalPrice, totalItem,subTotal,setSubtotal, setTotalItem,shippingCharge,setShippingCharge])


    console.log(shippingCharge," | ",totalItem," | ",subTotal," | ", totalPrice)

    const cartList = cart.map(item => <CartItem cartData={item} key={item.id} />);

    let btn ="";
    if(totalItem == 0){
        btn = "btn btn-success disabled"
    }else{
        btn = "btn btn-success"
    }


    const placeOrder = ()=>{
        
    }

    if(totalItem == 0){
        return(
            <Alert variant="warning" style={{ width: "100%" }}>
            <Alert.Heading>
              Your Cart is Empty! <Link ></Link>
            </Alert.Heading>
          </Alert>
        )
    }

    return (
        <React.Fragment>
            <div className="col-sm-12 col-md-10 col-md-offset-1">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Category</th>
                            <th>Quantity</th>
                            <th className="text-center">Unit Price</th>
                            <th className="text-center">Total</th>
                            <th> </th>
                        </tr>
                    </thead>
                    <tbody>

                        {cartList}

                        <tr>
                            <td>   </td>
                            <td>   </td>
                            <td>   </td>
                            <td><h5>Total items</h5></td>
                            <td className="text-right"><h5><strong>{totalItem}</strong></h5></td>
                        </tr>

                        <tr>
                            <td>   </td>
                            <td>   </td>
                            <td>   </td>
                            <td><h5>Subtotal</h5></td>
                            <td className="text-right"><h5><strong>&#2547; {subTotal}</strong></h5></td>
                        </tr>
                        <tr>
                            <td>   </td>
                            <td>   </td>
                            <td>   </td>
                            <td><h5>Estimated shipping</h5></td>
                            <td className="text-right"><h5><strong>&#2547; {shippingCharge}</strong></h5></td>
                        </tr>
                        <tr>
                            <td>   </td>
                            <td>   </td>
                            <td>   </td>
                            <td><h3>Total</h3></td>
                            <td className="text-right"><h3><strong>&#2547; {totalPrice}</strong></h3></td>
                        </tr>
                        <tr>
                            <td>   </td>
                            <td>   </td>
                            <td>   </td>
                            <td>
                                <button type="button" className="btn btn-default">
                                    <span className="fa fa-shopping-cart"></span> Continue Shopping
                                </button></td>
                            <td>

                                
                                {/* <button type="button" onClick={placeOrder} className={btn} style={{cursor:"default"}}>
                                    Checkout <span className="fa fa-play"></span>
                                </button> */}

                                <a href="/place-order">Checkout</a>
                                
                                
                                </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </React.Fragment>
    )
}

const mapStateToProps = state => {
    return {
        cart: state.shop.cart
    }
}



export default connect(mapStateToProps)(Cart)
