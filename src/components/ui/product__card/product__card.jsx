import { useState, useEffect } from 'react';
import { Favorite } from "../../../icons/favorite";
import { FavoriteActive } from '../../../icons/favorite-active';
import style from "./product__card.module.css";
import image from '../../../img/noImage.jpg';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Photo } from '../../../icons/photo';

export const ProductCard = ({product}) => {
    const [favorite, setFavorite] = useState(false);
    const [swiper, setSwiper] = useState(null);

    useEffect(() => {
        const data = localStorage.getItem('cardData');
        if (data) {
            try {
                const parsedData = JSON.parse(data);
                const exists = parsedData.some(item => item.id === product.id);
                setFavorite(exists);
            } catch (error) {
                console.error('Error parsing data from localStorage:', error);
            }
        }
    }, [product]);

    const handleFavorite = () => {
        const data = localStorage.getItem('cardData');
        const newData = data ? JSON.parse(data) : [];
        const existingIndex = newData.findIndex(item => item.id === product.id);

        if (existingIndex !== -1) {
            newData.splice(existingIndex, 1);
            setFavorite(false);
        } else {
            newData.push(product);
            setFavorite(true);
        }

        localStorage.setItem('cardData', JSON.stringify(newData));
    };


    return (
        <div className={style.product__card}>
            <div className={style.product__card__wrapper}>
                <div className={style.img__wrapper}>
                    <Swiper
                        slidesPerView={1}
                        navigation={true}
                        onSwiper={(swiper) => setSwiper(swiper)}
                        className={style.mySwiper}
                    >
                        {product.imgUrls && product.imgUrls.length > 0 && (
                            product.imgUrls.map((imageUrl, index) => (
                                
                                    <SwiperSlide key={index} className={style.swiper__slide}>
                                        <Link to={`/products/${product.id}`}>
                                        <img src={imageUrl} alt={`Slide ${index}`}/>
                                        <div className={style.count}><Photo />{`${index + 1} / ${product.imgUrls.length}`}</div>
                                        </Link>
                                    </SwiperSlide>
                            ))
                            
                        )}
                            <div className={style.swiper__button__prev} onClick={() => swiper.slidePrev()}></div>
                            <div className={style.swiper__button__next} onClick={() => swiper.slideNext()}></div>
                    </Swiper>
                </div>

                <div className={style.price__wrapper}>
                <Link to={`/products/${product.id}`}>
                    <h3 className={style.price}>{`${product.price.toLocaleString('ru-RU')} ${product.currency}`}</h3>
                </Link>
                    <button className={style.favorite__button} onClick={handleFavorite}>{!favorite ? <Favorite /> : <FavoriteActive />}</button>
                </div>
                <Link to={`/products/${product.id}`}>
                <h4 className={style.adress}>{product.adress}</h4>
                <p className={style.district}>{product.district}</p>
                </Link>
                <Link to={`/products/${product.id}`}>
                <div className={style.desc__wrapper}>
                    <div className={style.desc__position}>
                        <p className={`${style.desc} ${style.desc1}`}>{product.rooms}</p>
                        <p className={`${style.desc} ${style.desc2}`}>{product.flor}</p>
                    </div>
                    <div className={style.desc__position}>
                        <p className={`${style.desc} ${style.desc3}`}>{product.area} м²</p>
                        <p className={`${style.desc} ${style.desc4}`}>{product.state}</p>
                    </div>
                </div>
                <div className={style.paragraph__wrapper}>
                    <p className={style.description}>{product.description}</p>
                </div>
                </Link>
            </div>
            
        </div>
    );
}