
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

import { connect } from 'react-redux'
import { addToCart } from '../../redux/shopping/shoppingActions'
import { categoryService } from '../../axios'
import { Container, Col, Row } from 'react-bootstrap'
import './Product.css'


const Product = ({ data, addToCart }) => {
    const image = "http://localhost:8200/api/v1/product-service/uploads/view/"

    const [categoryTitle, setCategoryTitle] = useState("")

    useEffect(() => {

        async function fetchCategory() {
            categoryService.get(`get/category?id=${data.categoryId}`).then(res => {
                setCategoryTitle(res.data.categoryTitle)
            }).catch(error => {

            })
        }

        fetchCategory();


    }, []);




    console.log(categoryTitle)


    const MAX_LENGTH = 40;
    return (
        <React.Fragment>

            <Col xs={12} md={4} xl={3} lg={3} >
                <div className="four wide column mt-5">
                    <div class="ui link card">
                        <Link to={`/c/${data.categoryId}/product/${data.id}`} class="image">
                            <img src={image + data.productImages[0]} />
                        </Link>
                        <div class="content">
                            <Link to={`/c/${data.categoryId}/product/${data.id}`} class="header">{data.productTitle.substring(0, MAX_LENGTH)}</Link>
                            <div class="meta mt-2">
                                <p>&#2547;{data.productFinalPrice}</p>
                            </div>
                            <div className="meta mt-2 mb-2">
                            <Link to={`/category/products/${data.categoryId}`}>{categoryTitle}</Link>
                            </div>
                            <button onClick={() => addToCart(data.id)} class="btn btn-secondary">
                                Add to Cart
                            </button>
                        </div>
                    </div>

                </div>
            </Col>

        </React.Fragment>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        addToCart: (id) => dispatch(addToCart(id))

    }
}

export default connect(null, mapDispatchToProps)(Product);