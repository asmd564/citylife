import style from "./topProposition.module.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ProductCard } from "../../ui/product__card/product__card";
import { Oval } from 'react-loader-spinner';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

export const TopProposition = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [swiper, setSwiper] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://46.41.141.5:3001/products`);
                setProducts(response.data);
            } catch (error) {
                setError(error.message || 'помилка завантаження даних');
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const fetchTop = products.filter(product => product.top === true);

    return (
        <section className={style.top}>
            <div className={`${style.top__wrapper} container`}>
                <h2 className={style.title}>Топ пропозиції</h2>
                <div className={style.cards__wrapper}>
                    {isLoading ? (
                        <div className={style.center}>
                            <Oval
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
                        </div>
                    ) : error ? (
                        <h2 className={style.error}>Помилка завантаження даних!</h2>
                    ) : (
                        <Swiper
                            spaceBetween={32}
                            slidesPerView={3}
                            navigation={true}
                            onSwiper={(swiper) => setSwiper(swiper)}
                            className={style.mySwiper}
                        >
                            {fetchTop.map((product) => (
                                <SwiperSlide key={product.id} className={style.swiper__slide}>
                                        <ProductCard product={product} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    )}

                    <div className={style.swiper__button__prev} onClick={() => swiper.slidePrev()}></div>
                    <div className={style.swiper__button__next} onClick={() => swiper.slideNext()}></div>
                </div>
            </div>
        </section>
    );
}
