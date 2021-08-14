import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { productService, categoryService } from '../../axios'
import { connect } from 'react-redux'
import { addToCart } from '../../redux/shopping/shoppingActions'

import { Container,Carousel, Col, Row, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import './ProductDetails.css'
import loader from '../../img/loader.gif'
import Loader from '../loader/Loader'
const ProductDetails = ({ item, addToCart }) => {

    const [productDetails, setProductDetails] = useState({
        id: "",
        productTitle: "",
        productCategoryId: "",
        productDescription: "",
        productOverview: "",
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
                        productPrice: res.data.data.productFinalPrice,
                        discount: res.data.data.discountPercentage,
                        rating: res.data.data.productRating,
                        productImages: res.data.data.productImages
                    })
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
    console.log(category, "category")
    console.log(categoryDetails, "categoryDetails")
    return (
        <React.Fragment>

            <Row>
                {productDetails.categoryId}
            </Row>
            <Row>
                <Col xs={12} md={6} xl={6} lg={6}>
                    {/* <p>{categoryDetails ?.parentCategory.grandParentCategory.grandParentCategoryTitle}->
               {categoryDetails ?.parentCategory.parentCategoryTitle}->
               {categoryDetails ?.categoryTitle}</p> */}

                    <Carousel fade>



                        {productDetails.productImages.map(image => {

                            image = iurl + image;

                            return (
                                <Carousel.Item>
                                    <img
                                        className="d-block w-100"
                                        src={image}
                                        alt="Third slide"
                                    />
                                </Carousel.Item>

                            )
                        })}
                    </Carousel>
                </Col>
                <Col xs={12} md={6} xl={6} lg={6}>
                    <h3 className="product-title">{productDetails.productTitle ? productDetails.productTitle : "Title not found"}</h3>
                    <p>{categoryDetails.categoryTitle}</p>
                    <p className="product-description">
                        {productDetails.productOverview ? productDetails.productOverview : ""}
                    </p>


                    <h3 className="product-price">Price: &#2547;<span>{productDetails.productPrice ? productDetails.productPrice : ""}</span></h3>
                    <h3 className="product-price">Discount:<span>{productDetails.discount}%</span></h3>

                    <div className="action">
                        <Button className="add-to-cart-btn" onClick={() => addToCart(productDetails.id)}>Add to Cart</Button>
                       
                    </div>
                </Col>
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