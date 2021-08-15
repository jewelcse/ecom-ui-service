
import React, { useState, useEffect, useReducer } from 'react'

import { Button } from 'react-bootstrap';
import { Container, Col, Row } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import * as shoppingActions from '../../redux/shopping/shoppingActions'


import { productService } from '../../axios'
import Product from '../product/Product'
import Layout from '../layout/Layout'
import Loader from '../loader/Loader'

import loader from '../../img/loader.gif'

const ProductList = () => {

    const [products, setProducts] = useState([])
    const [loading, setloading] = useState(true)

    const dispatch = useDispatch();
    useEffect(() => {

        async function fetchAllProducts() {
            productService.get("get/products", {
                headers: {
                    'user-agent': 'Mozilla/4.0 MDN Example',
                    'content-type': 'application/json'
                }
            }).then(res => {
                console.log(res.data.data, "fetchin")
                setProducts(res.data.data)
                setloading(false)
                dispatch(shoppingActions.setProducts(res.data.data))
            }).catch(error => {

            })
        }

        fetchAllProducts();


    }, []);



    const productList = products.map((product) =>

        <Product data={product} id={product.id} key={product.id} />
    );

    if (loading) {
        return (
            <Loader />
        )
    }


    if (products.length === 0) {
        return (
            <p>No Products Available</p>
        )
    }

    return (
        <React.Fragment>

            <Layout>
                <Row>

                    {productList}
                </Row>

            </Layout>
        </React.Fragment>
    );

}


export default ProductList;