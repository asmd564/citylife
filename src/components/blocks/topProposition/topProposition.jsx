import style from "./topProposition.module.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ProductCard } from "../../ui/product__card/product__card";
import productsData from "../../../api/products.json";

export const TopProposition = () => {
    const [products, setProducts] = useState([]);

    useEffect(()=> {
       const fetchTop = productsData.filter(product => product.top === true);
       setProducts(fetchTop);
    },[]);

    return (
        <section className={style.top}>
            <div className={`${style.top__wrapper} container`}>
                <h2 className={style.title}>Топ пропозиції</h2>
                <div className={style.cards__wrapper}>
                    {products.map((product) => (
                    <div className="swiper-slide" key={product.id}>
                        <Link to={`/products/${product.id}`}>
                            <ProductCard product={product} />
                        </Link>
                    </div>
                    ))}
                </div>
            </div>
        </section>
    );
}