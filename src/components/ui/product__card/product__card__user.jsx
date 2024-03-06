import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Photo } from '../../../icons/photo';
import style from './product__card.module.css';
import { Trash } from '../../../icons/trash';
import axios from 'axios';
import { EditIcon } from '../../../icons/edit';

export const ProductCardUser = ({ product }) => {
    const { id } = useParams();
    const [swiper, setSwiper] = useState(null);
    const [showModal, setShowModal] = useState(false);


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
                                        <div className={style.id}>{`id: ${product.id}`}</div>
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
                    <div className={style.edit__buttons}>
                    </div>
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