
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

import { connect } from 'react-redux'
import { addToCart } from '../../redux/shopping/shoppingActions'
import { categoryService } from '../../axios'
import { Container, Col, Row, Toast, OverlayTrigger, Tooltip } from 'react-bootstrap'
import './Product.css'



import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Rating from 'react-rating';

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
                    <div className="ui link card">

                        <p className="off item">{data.discountPercentage}% </p>


                        <Link to={`/c/${data.categoryId}/product/${data.id}`} className="image">
                            <img src={image + data.productImages[0]} />
                        </Link>
                        <div className="content">
                            <Link to={`/c/${data.categoryId}/product/${data.id}`} className="header">{data.productTitle.substring(0, MAX_LENGTH)}</Link>

                            <div className="meta mt-2">
                                <p className="float-left"><s>&#2547;{data.productOriginalPrice}  </s></p>
                            </div>
                            <br />
                            <div className="meta mt-2">
                                <p className="float-left">&#2547;{data.productFinalPrice}</p>
                                <p className="float-right">
                                    <Rating
                                        placeholderRating={data.productRating}
                                        emptySymbol={<img style={{ width: "20px" }} src={process.env.PUBLIC_URL + '/assets/images/gray.svg'} className="icon" />}
                                        placeholderSymbol={<img src={process.env.PUBLIC_URL + '/assets/images/yellow.svg'} className="icon" />}
                                        fullSymbol={<img src={process.env.PUBLIC_URL + '/assets/images/yellow.svg'} className="icon" />}
                                        readonly={true}
                                    />
                                </p>
                            </div>
                            <br />
                            <div className="meta mt-2 mb-2">
                                <Link to={`/category/products/${data.categoryId}`}>{categoryTitle}</Link>
                            </div>
                            <div className="text-center">
                                <button onClick={() => {
                                    addToCart(data.id);

                                    toast.success('ADDED TO THE CART!',
                                        { position: toast.POSITION.TOP_RIGHT, autoClose: 3000 })
                                }
                                } className="btn btn-secondary">
                                    Add to Cart
                            </button>
                            </div>
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