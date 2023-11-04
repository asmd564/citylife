import React, { useEffect, useState } from "react";
import { ProductCard } from "../../ui/product__card/product__card";
import style from "./anotherPropo.module.css";
import photo from "../../../img/Photo.png"
import productsData from "../../../api/products.json";
import axios from "axios";
import { Link } from "react-router-dom";

export const AnotherPropo = () => {
    const [filter, setFilter] = useState([]);

    useEffect(()=> {
        const productFilter = productsData.filter(product => product.top === false);
        setFilter(productFilter);
    },[]);

    return (
        <section className={style.another}>
            <div className={`${style.another__wrapper} "container"`}>
                <h2 className={style.title}>Інші пропозиції</h2>
                <div className={style.propo__wrapper}>
                    {filter.map((product) => (
                        <Link to={`/products/${product.id}`}>
                            <ProductCard product={product} key={product.id}/>
                        </Link>
                    ))}
                </div>
                        {filter.length > 9 
                        ?
                        <button className={style.another__button}><p>Показати більше</p></button>
                        :
                        <></>
                        }
            </div>
        </section>
    );
}