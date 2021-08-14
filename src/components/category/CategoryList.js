
import React, { useState, useEffect, useReducer } from 'react'
import { Link } from 'react-router-dom'

import { Button } from 'react-bootstrap'

import { categoryService } from '../../axios'
import Category from './Category'


const CategoryList = () => {

    const [categories, setCategories] = useState([]);

    useEffect(() => {

        async function fetchArticles() {
            categoryService.get("get/categories").then(res => {
                setCategories(res.data);
                console.log(setCategories)

            }).catch(error => {
                console.log("Something went Wrong! Check your Internet Connection plz");
            })
        }
        fetchArticles();
    }, [])


    const lists = categories.map((category) => (

        <Category data={category} key={category.id} />
    ));


    return (

        <div className='list'>
            {lists}
        </div>

    )
}


export default CategoryList;