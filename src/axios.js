import axios from 'axios'

export const productService = axios.create({
    baseURL: 'http://localhost:8200/api/v1/product-service/'
});

export const categoryService = axios.create({
    baseURL: 'http://localhost:8100/api/v1/category-service/'
});

export const orderService = axios.create({
    baseURL: 'http://localhost:8300/api/v1/order-service/'
});
