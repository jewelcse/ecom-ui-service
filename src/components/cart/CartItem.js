import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import {categoryService} from '../../axios'
import { useParams,Link } from 'react-router-dom'
import { removeFromCart, adjustQty } from '../../redux/shopping/shoppingActions'

const CartItem = ({ cartData, removeFromCart, adjustQty }) => {

    const [categoryTitle, setCategoryTitle] = useState("")
   
    const [input, setInput] = useState(cartData.qty)
    const onChangeHandler = (e) => {
        console.log(e.target.value)
       
        setInput(e.target.value)
        adjustQty(cartData.id, e.target.value)
    }

   
    
        useEffect(() => {
    
            async function fetchCategory() {
                categoryService.get(`get/category?id=${cartData.categoryId}`).then(res => {
                    setCategoryTitle(res.data.categoryTitle)
                }).catch(error => {
    
                })
            }
    
            fetchCategory();
    
    
        }, []);


    const iurl = "http://localhost:8200/api/v1/product-service/uploads/view/"
    return (
        <tr>
            <td className="col-sm-8 col-md-6">
                <div className="media">
                    <a className="thumbnail pull-left" href="#"> <img className="media-object" src={iurl+cartData.productImages[0]} style={{ width: "72px", height: "72px" }} /> </a>
                    <div className="media-body">
                        <h4 className="media-heading"><a href="#">{cartData.productTitle ? "": cartData.productTitle}</a></h4>
                        <h5 className="media-heading"><Link to={`/category/products/${cartData.categoryId}`}>{categoryTitle}</Link></h5>
                    </div>
                </div></td>
            <td className="col-sm-1 col-md-1" style={{ textAlign: "center" }}>
                <input type="number" min="1" id="qty" name="qty" className="form-control" value={input} onChange={onChangeHandler} />
               
            </td>
            <td className="col-sm-1 col-md-1 text-center"><strong>&#2547; {cartData.productFinalPrice?"" :cartData.productFinalPrice}</strong></td>
            <td className="col-sm-1 col-md-1 text-center"><strong> &#2547;{cartData.qty * cartData.productFinalPrice}</strong></td>
            <td className="col-sm-1 col-md-1">
                <button onClick={() => removeFromCart(cartData.id)} type="button" className="btn btn-danger">
                    <span className="fa fa-remove"></span> Remove
                    </button>
            </td>
        </tr>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        removeFromCart: (id) => dispatch(removeFromCart(id)),
        adjustQty: (id, value) => dispatch(adjustQty(id, value))
    }
}

export default connect(null, mapDispatchToProps)(CartItem)
