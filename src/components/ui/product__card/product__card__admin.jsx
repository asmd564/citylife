import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Photo } from '../../../icons/photo';
import style from './product__card.module.css';
import { Trash } from '../../../icons/trash';
import axios from 'axios';
import { EditIcon } from '../../../icons/edit';

export const ProductCardAdmin = ({ product, onDelete, updateProductsList }) => {
    const [swiper, setSwiper] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleDelete = async () => {
        await onDelete(product.id);
        setShowModal(false);
        updateProductsList(); // Обновление списка продуктов после удаления
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
                                        <Link to={`/admin/dashboard/${product.user_id}/my-products/${product.id}`}>
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
                <Link to={`/admin/dashboard/${product.user_id}/my-products/${product.id}`}>
                    <h3 className={style.price}>{`${product.price.toLocaleString('ru-RU')} ${product.currency}`}</h3>
                </Link>
                    <div className={style.edit__buttons}>
                        <button className={style.favorite__button} onClick={() => setShowModal(true)}><Trash /></button>
                        <button className={style.favorite__button}><Link to={`/admin/dashboard/${product.user_id}/my-products/edit/${product.id}`}><EditIcon /></Link></button>
                    </div>
                </div>
                <Link to={`/admin/dashboard/${product.user_id}/my-products/${product.id}`}>
                <h4 className={style.adress}>{product.adress}</h4>
                <p className={style.district}>{product.district}</p>
                </Link>
                <Link to={`/admin/dashboard/${product.user_id}/my-products/${product.id}`}>
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
            {showModal && (
                <div className={style.modal}>
                    <div className={style.modal__content}>
                        <p className={style.modal__title}>Ви впевнені, що бажаєте видалити?</p>
                        <div className={style.modal__buttons}>
                            <button onClick={() => setShowModal(false)} className={style.modal__btn2}>Скасувати</button>
                            <button onClick={handleDelete} className={style.modal__btn}>Так</button>
                        </div>
                        
                    </div>
                </div>
            )}
        </div>
    );
}