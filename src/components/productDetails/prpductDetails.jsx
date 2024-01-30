import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import style from "./productDetails.module.css";
import { Favorite } from "../../icons/favorite";
import { BookIcon } from "../../icons/book";
import { PhotoIcon } from "../../icons/photoIcon";
import { AgentCard } from "../agentCard/agentCard";
import { Contacts } from "../blocks/contacts/contacts";
import { WhyWe } from "../blocks/whyWe/whyWe";
import Map from "../blocks/map/map";
import ProjectMap from "../ProjectMap/ProjectMap";
import { useInView } from 'react-intersection-observer';
import image from '../../img/noImage.jpg';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { FavoriteActive } from "../../icons/favorite-active";
import { Photo } from "../../icons/photo";
import { Close } from "../../icons/close";

export const ProductDetails = () => {
   const { id } = useParams();
   const [product, setProduct] = useState([]);
   const [user, setUser] = useState([]);
   const navigate = useNavigate();
   const [userId, setUserId] = useState('');
   const contactsRef = useRef(null);
   const targetRef = useRef(null);
   const agentCardRef = useRef(null);
   const [isSticky, setIsSticky] = useState(false);
   const [topPosition, setTopPosition] = useState(0);
   const [productsCount, setProductsCound] = useState(0);
   const [image, setImage] = useState('');
   const [swiper, setSwiper] = useState(null);
   const [swiper1, setSwiper1] = useState(null);
   const [favorite, setFavorite] = useState(false);
   const [gallery, setGallery] = useState(false);

   const toggleFavorite = () => {
    const storedData = localStorage.getItem('cardData');
    let cardData = storedData ? JSON.parse(storedData) : [];

    const existingProductIndex = cardData.findIndex(item => item.id === product.id);
    if (existingProductIndex !== -1) {
        // Продукт уже в избранном, удаляем его
        cardData = cardData.filter(item => item.id !== product.id);
        setFavorite(false);
    } else {
        // Продукт не в избранном, добавляем его
        cardData.push(product);
        setFavorite(true);
    }

    localStorage.setItem('cardData', JSON.stringify(cardData));
};

useEffect(() => {
    const storedData = localStorage.getItem('cardData');
    if (storedData) {
        const cardData = JSON.parse(storedData);
        const isFavorite = cardData.some(item => item.id === product.id);
        setFavorite(isFavorite);
    }
}, [product]);

   useEffect(() => {
    const fetchData = async () => {
       try {
          const [productResponse, usersResponse] = await Promise.all([
             axios.get(`http://46.41.141.5:3001/products/${id}`, {
                params: {
                   random: Math.random()
                }
             }),
             axios.get(`http://46.41.141.5:3001/users`)
          ]);

          setProduct(productResponse.data);
          const foundUser = usersResponse.data.find(user => user.id === productResponse.data.user_id);
          setUser(foundUser);
       } catch (error) {
          console.error('Ошибка загрузки данных:', error);
       }
    };

    fetchData();
 }, [id]);


   const [agentRef, inView] = useInView({
    triggerOnce: false,
});

console.log(user);



const handleScroll = () => {
    setIsSticky(!inView);
};


useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
        window.removeEventListener('scroll', handleScroll);
    };
}, []);


   const handleBack = () => {
        navigate(-1);
   }


   const scrollToRef = () => {
    const headerOffset = 120;
    if (targetRef.current) {
      const elementPosition = targetRef.current.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const handleOpenGallery = () => {
    setGallery(true);
  }

  const closeGallery = () => {
    setGallery(false);
 }

   useEffect(() => {
    window.scrollTo(0,0);
   },[])
    return (
        <section className={`${style.product__details} ${style.container}`}>
            <p className={style.go__back} onClick={handleBack}>Назад до оголошень</p>
            { product ? (
                <>
                    <div className={style.details__wrapper}>
                        <div className={style.slider__img}>
                            <Swiper
                                spaceBetween={32}
                                slidesPerView={1}
                                navigation={true}
                                autoplay={true}
                                onSwiper={(swiper) => setSwiper(swiper)}
                                className={style.mySwiper}
                            >
                                {product.imgUrls && product.imgUrls.length > 0 ? (
                                product.imgUrls.map((imageUrl, index) => (
                                    <SwiperSlide key={index} className={style.swiper__slide}>
                                        <img src={imageUrl} alt={`Slide ${index}`} />
                                        <div className={style.count}><Photo />{`${index + 1} / ${product.imgUrls.length}`}</div>
                                    </SwiperSlide>
                                ))
                                   
                                ) : (
                                    <img src={image} alt="error" />
                                )}
                                <div className={style.swiper__button__prev} onClick={() => swiper && swiper.slidePrev && swiper.slidePrev()}></div>
                                <div className={style.swiper__button__next} onClick={() => swiper && swiper.slidePrev && swiper.slideNext()}></div>
                            </Swiper>                 
                        </div>
                        <div className={style.other__img}>
                            <div className={style.other__img1}>
                                {product.imgUrls && product.imgUrls.length > 0 ? (
                                    <img src={product.imgUrls[1]} alt="First product image" />
                                ) : (
                                    <img src={image} alt="error" />
                                )}
                            </div>
                            <div className={style.other__img1}>
                                {product.imgUrls && product.imgUrls.length > 0 ? (
                                    <img src={product.imgUrls[2]} alt="First product image" />
                                ) : (
                                    <img src={image} alt="error" />
                                )}
                            </div>
                        </div>
                    </div>  
                    <div className={style.card__container}>
                    { product && Object.keys(product).length > 0 ? (
                        <section className={style.price__header}>
                            <h2 className={style.price}>{`${product.currency}  ${product.price.toLocaleString('ru-RU')}`}</h2>
                            <div className={style.price__header__wrapper}>
                                <button className={style.favorive} onClick={toggleFavorite}>
                                    <div className={style.favotite__title}>В обране{favorite ? <FavoriteActive /> : <Favorite />}</div>
                                </button>

                                <button onClick={scrollToRef} className={style.map__btn}>
                                    <div className={style.favotite__title1}><BookIcon />Дивитись на мапі</div>
                                </button>

                                <button className={style.map__btn}>
                                    <div className={style.favotite__title1} onClick={handleOpenGallery}><PhotoIcon />Всі фото</div>
                                </button>
                            </div>
                        </section> 
                        ) : (
                            <p></p>
                        )}
                    <section className={style.description}>
                        <div className={style.description__wrapper}>
                            <div className={style.id__wrapper}>
                                <p className={style.localization}>{`${product.city}, ${product.district}`}</p>
                                <p className={style.id}>ID:<span>{product.id}</span></p>
                            </div>
                            <h2 className={style.description__title}>{product.name}</h2>
                            <div className={style.description__goods}>
                                <div className={style.goods__wrapper}>
                                    <div className={style.good}>
                                        <p className={`${style.type} ${style.type__width}`}>Вулиця</p>
                                        <p className={style.desc}>{product.adress}</p>
                                    </div>
                                    <div className={style.good}>
                                        <p className={`${style.type} ${style.type__width} ${style.room}`}>Кімнат</p>
                                        <p className={style.desc}>{product.rooms}</p>
                                    </div>
                                    <div className={style.good}>
                                        <p className={`${style.type} ${style.type__width} ${style.area}`}>Площа</p>
                                        <p className={style.desc}>{product.area} м²</p>
                                    </div>
                                    <div className={style.good}>
                                        <p className={`${style.type} ${style.type__width} ${style.floor}`}>Поверх</p>
                                        <p className={style.desc}>{product.flor}</p>
                                    </div>
                                </div>

                                <div className={style.goods__wrapper}>
                                    <div className={style.good}>
                                        <p className={`${style.type} ${style.state}`}>Стан</p>
                                        <p className={style.desc}>{product.state}</p>
                                    </div>
                                    <div className={style.good}>
                                        <p className={`${style.type} ${style.heating}`}>Опалення</p>
                                        <p className={style.desc}>{product.heating}</p>
                                    </div>
                                    <div className={style.good}>
                                        <p className={`${style.type} ${style.waterheating}`}>Підігрів води</p>
                                        <p className={style.desc}>{product.waterheating}</p>
                                    </div>
                                    <div className={style.good}>
                                        <p className={`${style.type} ${style.buildingtype}`}>Тип будинку</p>
                                        <p className={style.desc}>{product.buildingtype}</p>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                        <div className={style.card__wrapper} >
                            <AgentCard user={user}/>
                        </div>
                    </section>
                    <section className={style.full__description}>
                        <h2 className={style.full__title}>Опис </h2>
                        <div className={style.full__desc__wrapper}>
                            <p className={style.full__desc}>{product.description}</p>
                        </div>
                    </section>
                    </div>
                    <div ref={targetRef}>
                        <ProjectMap lat={product.lat} lng={product.lng}/>
                    </div>
                    <Contacts ref={contactsRef}/>
                    <WhyWe />
                    <div className={style.map__wrapper}>
                        <Map />
                    </div>
                   
                </>  
            ) : (
                <p></p>
            )

            }
            {gallery && (
                <div className={style.gallery}>
                <div className={style.gallery__container}>
                <div className={style.gallery__wrapper}>
                    <div className={style.gllery__buttons__wrapper}>
                        <div className={style.gallery__buttons__wrapper}>
                            <div className={style.gallery__button}>
                                {`Фото(${product.imgUrls ? product.imgUrls.length : 0})`}
                            </div>

                            <div className={style.gallery__button}>
                            
                            </div>
                        </div>
                    </div>

                    <div className={style.gallery__slider}>
                    <Swiper
                        spaceBetween={32}
                        slidesPerView={1}
                        navigation={true}
                        onSwiper={(swiper) => setSwiper1(swiper)}
                        className={style.mySwiper2}
                    >
                        {product.imgUrls && product.imgUrls.length > 0 ? (
                        product.imgUrls.map((imageUrl, index) => (
                            <SwiperSlide key={index} className={style.swiper__slide1}>
                                <img src={imageUrl} alt={`Slide ${index}`} />
                                <div className={style.count}><Photo />{`${index + 1} / ${product.imgUrls.length}`}</div>
                            </SwiperSlide>
                        ))
                            
                        ) : (
                            <img src={image} alt="error" />
                        )}
                        
                    </Swiper>
                        <div className={style.swiper__button__prev1} onClick={() => swiper1 && swiper1.slidePrev && swiper1.slidePrev()}></div>
                        <div className={style.swiper__button__next1} onClick={() => swiper1 && swiper1.slidePrev && swiper1.slideNext()}></div>
                        <button className={style.close} onClick={closeGallery}><Close /></button>             
                    </div>
                </div>
                </div>
               
            </div>
            )}
            
        </section>
    )
}