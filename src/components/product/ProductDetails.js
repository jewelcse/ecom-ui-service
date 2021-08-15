import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { productService, categoryService } from '../../axios'
import { connect } from 'react-redux'
import { addToCart } from '../../redux/shopping/shoppingActions'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
    Magnifier,
    GlassMagnifier,
    SideBySideMagnifier,
    PictureInPictureMagnifier,
    MOUSE_ACTIVATION,
    TOUCH_ACTIVATION
} from "react-image-magnifiers";


import { Container, Carousel, Col, Row, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import './ProductDetails.css'
import loader from '../../img/loader.gif'
import Loader from '../loader/Loader'
import Rating from 'react-rating';
const ProductDetails = ({ item, addToCart }) => {

    const [loading, setloading] = useState(true)

    const [productDetails, setProductDetails] = useState({
        id: "",
        productTitle: "",
        productCategoryId: "",
        productDescription: "",
        productOverview: "",
        productOriginalPrice: "",
        productPrice: "",
        productImages: [],
        discount: "",
        rating: ""
    })
    const [category, setCategory] = useState({
        categoryTitle: "",
        parentCategoryTitle: "",
        grandParentCategoryTitle: "",
    })

    const [categoryDetails, setCategoryDetails] = useState({})

    const [error, setError] = useState(null)

    const { id } = useParams();
    const { cid } = useParams();

    useEffect(() => {
        async function fetchProduct() {
            productService.get(`get/product?productId=${id}`)
                .then(res => {
                    console.log(res.data.data)
                    setProductDetails({
                        id: res.data.data.id,
                        productTitle: res.data.data.productTitle,
                        productCategoryId: res.data.data.categoryId,
                        productDescription: res.data.data.productDescription,
                        productOverview: res.data.data.productOverview,
                        productOriginalPrice: res.data.data.productOriginalPrice,
                        productPrice: res.data.data.productFinalPrice,
                        discount: res.data.data.discountPercentage,
                        rating: res.data.data.productRating,
                        productImages: res.data.data.productImages
                    })

                    setloading(false)
                })
                .catch(error => { setError("Does't exit this product") })
        }

        fetchProduct();

    }, []);

    useEffect(() => {

        async function fetchCategory() {
            categoryService.get(`get/category?id=${cid}`)
                .then(res => {
                    console.log(res.data)
                    setCategoryDetails(res.data)
                    setCategory({

                        grandParentCategoryTitle: res.data.category.parentCategory.grandParentCategory.grandParentCategoryTitle,
                        parentCategoryTitle: res.data.category.parentCategory.parentCategoryTitle,
                        categoryTitle: res.data.category.categoryTitle,

                    })


                }).catch(error => {

                })
        }
        fetchCategory();
    }, []);

    const iurl = "http://localhost:8200/api/v1/product-service/uploads/view/";


    if (loading) {
        return (
            <Loader />
        )
    }
    return (
        <React.Fragment>

            <Row>
                {productDetails.categoryId}
            </Row>
            <Row>
                <Col xs={12} md={6} xl={6} lg={6}>

                    <Carousel fade indicators={true} controls={false}>

                        {productDetails.productImages.map(image => {

                            image = iurl + image;

                            return (
                                <Carousel.Item key={image}>

                                    <SideBySideMagnifier
                                        imageSrc={image}
                                        alwaysInPlace={true}
                                        overlayBoxOpacity={1}

                                    />
                                </Carousel.Item>
                            )
                        })}
                    </Carousel>
                </Col>
                <Col xs={12} md={6} xl={6} lg={6}>
                    <h3 className="product-title">{productDetails.productTitle}</h3>
                    <p>{categoryDetails.categoryTitle}</p>
                    <p>
                    <Rating
                            placeholderRating={productDetails.rating}
                            emptySymbol={<img style={{ width: "20px" }} src={process.env.PUBLIC_URL + '/assets/images/gray.svg'} className="icon" />}
                            placeholderSymbol={<img src={process.env.PUBLIC_URL + '/assets/images/yellow.svg'} className="icon" />}
                            fullSymbol={<img src={process.env.PUBLIC_URL + '/assets/images/yellow.svg'} className="icon" />}
                            
                        />
                    </p>

                    <p className="product-description">
                        {productDetails.productOverview}
                    </p>


                    <p className="product-price"><s>Price: &#2547;<span>{productDetails.productOriginalPrice}</span></s></p>
                    <p className="product-price">New Price: &#2547;<span>{productDetails.productPrice}</span></p>
                    <p className="product-price">Discount Percentage(%):<span>{productDetails.discount}%</span></p>

                    <div className="action text-center">
                        <Button className="btn btn-secondary" onClick={() => {
                            addToCart(productDetails.id);
                            toast.success('ADDED TO THE CART!',
                                { position: toast.POSITION.TOP_RIGHT, autoClose: 3000 })
                        }}>Add to Cart</Button>

                    </div>
                </Col>

                <hr style={{border:"5px solid #1f6480",width:"100%"}}/>
                <p className="product-description">
                    {productDetails.productDescription ? productDetails.productDescription : ""}
                </p>
            </Row>
        </React.Fragment>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        addToCart: (id) => dispatch(addToCart(id))

    }
}


export default connect(null, mapDispatchToProps)(ProductDetails)