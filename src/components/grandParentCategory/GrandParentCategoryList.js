
import React, { useState, useEffect, useReducer } from 'react'
import { Link } from 'react-router-dom'

import { Button } from 'react-bootstrap'

import { categoryService } from '../../axios'
import Category from './GrandParentCategory'


const GrandParentCategory = () => {

    const [grandParentCategories, setGrandParentCategories] = useState([]);

    useEffect(() => {

        async function fetchArticles() {
            categoryService.get("get/grand-parent-categories").then(res => {
                setGrandParentCategories(res.data);
                console.log(grandParentCategories)

            }).catch(error => {
                console.log("Something went Wrong! Check your Internet Connection plz");
            })
        }
        fetchArticles();
    }, [])


    const lists = grandParentCategories.map((category) => (

        <Category data={category} key={category.id} />
    ));


    return (

        <div className='list'>
            {lists}
        </div>

    )
}


export default GrandParentCategory;