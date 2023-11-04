import { Favorite } from "../../../icons/favorite";
import style from "./product__card.module.css";

export const ProductCard = ({product}) => {
    return (
        <div className={style.product__card}>
            <div className={style.product__card__wrapper}>
                <img src={product.imgUrl} alt="image" className={style.img}/>
                <div className={style.price__wrapper}>
                    <h3 className={style.price}>{`${product.price} ${product.currency}`}</h3>
                    <button className={style.favorite__button}><Favorite /></button>
                </div>
                <h4 className={style.adress}>{product.adress}</h4>
                <p className={style.district}>{product.district}</p>
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
            </div>
        </div>
    );
}