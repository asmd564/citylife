import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import style from './myProducts.module.css';
import { ProductCard } from "../../../../components/ui/product__card/product__card";

export const MyProducts = () => {
    const { id } = useParams();
    const [product, setProduct] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`http://46.41.141.5:3001/products`) 
                const filteredData = response.data.filter(item => item.user_id == id);
                setProduct(filteredData);
            } catch (error) {
                console.error(error);
            }
        }
        fetchProducts()
    },[])


    return (
        <div className={style.section__wrapper}>
            <h2 className={style.title}>Мої оголошення</h2>
            <div className={style.cards__wrapper}>
                {product && product.length > 0 ? (
                product.map(item => (
                            <ProductCard product={item}/>
                    ))
                ) : (
                    <h3>У вас ще немає оголошень...</h3>
                )}
            
            </div>
        </div>
    )
}