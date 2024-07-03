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
                const response = await axios.get(`${process.env.REACT_APP_BE_HOST}/products`);
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

    const handlePrevClick = (event) => {
      event.preventDefault();
      if (swiper) swiper.slidePrev();
  };

  const handleNextClick = (event) => {
      event.preventDefault();
      if (swiper) swiper.slideNext();
  };

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
                      <>
                        <Swiper
                            spaceBetween={32}
                            slidesPerView={1}
                            navigation={true}
                            breakpoints={{
                                0: {
                                    slidesPerView: 1.1,
                                    spaceBetween: 5,
                                  },
                                358: {
                                    slidesPerView: 1.2,
                                    spaceBetween: 5,
                                  },
                                413: {
                                    slidesPerView: 1.4,
                                    spaceBetween: 5,
                                  },
                                465: {
                                    slidesPerView: 1.5,
                                    spaceBetween: 5,
                                  },
                                501: {
                                    slidesPerView: 1.2,
                                    spaceBetween: 5,
                                  },
                                613: {
                                    slidesPerView: 1.5,
                                    spaceBetween: 5,
                                  },
                                800: {
                                    slidesPerView: 2,
                                    spaceBetween: 0,
                                  },
                                830: {
                                    slidesPerView: 2.1,
                                    spaceBetween: 5,
                                  },
                                891: {
                                    slidesPerView: 2.1,
                                    spaceBetween: 10,
                                  },
                                905: {
                                    slidesPerView: 2.4,
                                    spaceBetween: 5,
                                  },
                                1000: {
                                    slidesPerView: 2.3,
                                    spaceBetween: 5,
                                  },
                                1050: {
                                    slidesPerView: 2.5,
                                    spaceBetween: 5,
                                  },
                                1161: {
                                    slidesPerView: 2.7,
                                    spaceBetween: 5,
                                  },
                                1220: {
                                  slidesPerView: 3,
                                  spaceBetween: 10,
                                },
                                1301: {
                                  slidesPerView: 3,
                                  spaceBetween: 10,
                                },
                                1400: {
                                  slidesPerView: 3,
                                  spaceBetween: 32,
                                },
                              }}
                            onSwiper={(swiper) => setSwiper(swiper)}
                            className={style.mySwiper}
                        >
                            {fetchTop.map((product) => (
                                <SwiperSlide key={product.id} className={style.swiper__slide}>
                                        <ProductCard product={product} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
  
                            <div className={style.swiper__button__prev} onClick={handlePrevClick}></div>
                            <div className={style.swiper__button__next} onClick={handleNextClick}></div>
                        </>
                       
                    )}

                    
                </div>
            </div>
        </section>
    );
}
