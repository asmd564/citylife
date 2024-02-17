import React, { useEffect, useState } from "react";
import { ProductCard } from "../../ui/product__card/product__card";
import style from "./anotherPropo.module.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { Oval } from  'react-loader-spinner'

export const AnotherPropo = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [visibleCards, setVisibleCards] = useState(9);

    const handleShowMore = () => {
        setVisibleCards(prevCount => prevCount + 9);
      };

    useEffect(()=> {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BE_HOST}/products`);
                setProducts(response.data);
            } catch (error) {
                setError(error.message || 'помилка завантаження даних');
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    },[]);

    const filter = products.filter(product => product.top === false);

    return (
        <section className={style.another}>
            <div className={`${style.another__wrapper} "container"`}>
                <h2 className={style.title}>Інші пропозиції</h2>
                <div className={style.propo__wrapper}>
                    {isLoading ? 
                        (<Oval
                        height={80}
                        width={80}
                        color="#4fa94d"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                        ariaLabel='oval-loading'
                        secondaryColor="#4fa94d"
                        strokeWidth={2}
                        strokeWidthSecondary={2}
                      
                      />
                      ) : error ? (
                        <div>
                            <h2 className={style.error}>Помилка завантаження даних!</h2>
                        </div>

                      ): (filter.slice(0, visibleCards).map((product) => (
                                <ProductCard product={product} key={product.id}/>
                        ))
                      )
                      
                    }
                </div> 
                    {visibleCards < filter.length && filter.length > 9 && (
                        <button className={style.another__button} onClick={handleShowMore}><p>Показати більше</p></button>
                    )}      
                    
            
            </div>
        </section>
    );
}