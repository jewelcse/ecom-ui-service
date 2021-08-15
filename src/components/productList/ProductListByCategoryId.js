
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import { Button } from 'react-bootstrap';
import { Container, Col, Row } from 'react-bootstrap'

import { productService } from '../../axios'
import Product from '../product/Product'
import Layout from '../layout/Layout'

import Loader from '../loader/Loader'

import { useDispatch } from 'react-redux'

import * as shoppingActions from '../../redux/shopping/shoppingActions'



const ProductListByCategoryId = () => {


    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [products, SetProducts] = useState([])


    const cid = useParams();

    useEffect(() => {


        async function fetchAllProductsByCategory() {
            productService.get(`/get/products/byCategory/${cid}`, {
                headers: {
                    'user-agent': 'Mozilla/4.0 MDN Example',
                    'content-type': 'application/json'
                }
            }).then(res => {
                setLoading(false)
                setError('')
                console.log(res.data.data, " from categoryById")
            }).catch(error => {
                console.log(error);
                setLoading(true)
                setError('Check Connection')
            });

        }
        fetchAllProductsByCategory();
    }, []);





    const productList = products.map((product) =>
        <Product data={product} id={product.id} key={product.id} />
    )

    if (loading) {
        return (
            <Loader />
        )
    }

    return (
        <React.Fragment>
            <Row>
                {/* {productList} */}
            </Row>

        </React.Fragment>
    );

}


export default ProductListByCategoryId;