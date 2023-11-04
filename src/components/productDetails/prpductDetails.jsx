import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import style from "./productDetails.module.css";
import productData from "../../api/products.json";
import { Favorite } from "../../icons/favorite";
import { BookIcon } from "../../icons/book";
import { PhotoIcon } from "../../icons/photoIcon";
import { AgentCard } from "../agentCard/agentCard";
import { Contacts } from "../blocks/contacts/contacts";
import { WhyWe } from "../blocks/whyWe/whyWe";
import Map from "../blocks/map/map";

export const ProductDetails = () => {
   const { id } = useParams();
   const product = productData.find((p) => p.id === id.toString());
   const navigate = useNavigate();

   const handleBack = () => {
        navigate(-1);
   }

   useEffect(() => {
    window.scrollTo(0,0);
   },[])
    return (
        <section className={`${style.product__details} container`}>
            <p className={style.go__back} onClick={handleBack}>Назад до оголошень</p>
            { product ? (
                <>
                    <div className={style.details__wrapper}>
                        <div className={style.slider__img}>
                            <img src={product.imgUrl} alt="img" />
                        </div>
                        <div className={style.other__img}>
                            <div className={style.other__img1}>
                                <img src="" alt="" />
                            </div>
                            <div className={style.other__img1}>
                                <img src="" alt="" />
                            </div>
                        </div>
                    </div>  
                    <section className={style.price__header}>
                        <h2 className={style.price}>{`${product.currency}  ${product.price}`}</h2>
                        <div className={style.price__header__wrapper}>
                            <button className={style.favorive}><div className={style.favotite__title}>В обране<Favorite /></div></button>
                            <button className={style.map__btn}><div className={style.favotite__title1}><BookIcon />Дивитись на мапі</div></button>
                            <button className={style.map__btn}><div className={style.favotite__title1}><PhotoIcon />Всі фото</div></button>
                        </div>
                    </section> 
                    <section className={style.description}>
                        <div className={style.description__wrapper}>
                            <div className={style.id__wrapper}>
                                <p className={style.localization}>{product.city}</p>
                                <p className={style.id}>ID:<span>{product.id}</span></p>
                            </div>
                            <h2 className={style.description__title}>{product.title}</h2>
                            <div className={style.description__goods}>
                                <div className={style.goods__wrapper}>
                                    <div className={style.good}>
                                        <p className={style.type}>Вулиця</p>
                                        <p className={style.desc}>{product.adress}</p>
                                    </div>
                                    <div className={style.good}>
                                        <p className={`${style.type} ${style.room}`}>Кімнат</p>
                                        <p className={style.desc}>{product.rooms}</p>
                                    </div>
                                    <div className={style.good}>
                                        <p className={`${style.type} ${style.area}`}>Площа</p>
                                        <p className={style.desc}>{product.area} м²</p>
                                    </div>
                                    <div className={style.good}>
                                        <p className={`${style.type} ${style.floor}`}>Поверх</p>
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
                        <div className={style.card__wrapper}>
                                <AgentCard />
                            </div>
                    </section>
                    <section className={style.full__description}>
                        <h2 className={style.full__title}>Опис {product.ishouse === true ? "будинку" : "квартири"}</h2>
                        <div className={style.full__desc__wrapper}>
                            <p className={style.full__desc}>{product.description}</p>
                        </div>
                    </section>
                    <Contacts />
                    <WhyWe />
                    <div className={style.map__wrapper}>
                        <Map />
                    </div>
                   
                </>  
            ) : (
                <p>tovar nie najden</p>
            )

            }
        </section>
    )
}