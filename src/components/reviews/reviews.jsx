import React, { useEffect, useState } from "react";
import axios from "axios";
import style from './reviews.module.css';
import avatar from '../../img/emptyavatar.jpeg';
import { Oval } from "react-loader-spinner";

export const Reviews = () => {
    const[data, setData] = useState([]);
    const[hidden, setHidden] = useState(false);
    const[loader, setLoader] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        review: ""
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BE_HOST}/reviews`);
                const reviews = response.data.filter(review => review.publish === true);
                setData(reviews);
                console.log(data);
            } catch(error) {
                console.log(error);
            }
        }
        fetchData();
    },[]);


    useEffect (() => {
        window.scrollTo(0,0)
    },[])

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoader(true);
            await axios.post(`${process.env.REACT_APP_BE_HOST}/reviews`, formData);
            setFormData({
                name: "",
                email: "",
                review: ""
            });
            // Перезагрузить данные обзоров после добавления нового отзыва
            const response = await axios.get(`${process.env.REACT_APP_BE_HOST}/reviews`);
            const reviews = response.data.filter(review => review.publish === true);
            setData(reviews);
            console.log('send')
            setLoader(false);
            setHidden(true);
            setTimeout(() => {
                setHidden(false);
            }, 3000)
        } catch(error) {
            console.log(error);
        }
    };

    return (
        <section className={style.reviews}>
            <h1 className={style.reviews__title}>Наші відгуки</h1>
            <div className={style.reviews__wrapper}>
            {data.length > 0 ? (
                data.map(review => (
                    <div className={style.reviews__card} key={review.id}>
                    <div className={style.avatar}>
                        <img src={avatar} alt="" />
                    </div>
                    <div className={style.review__card__wrapper}>
                        <h2 className={style.card__title}>{review.name} <span>|</span> <span> </span></h2>
                        <p className={style.card__description}>{review.review}</p>
                    </div>
                </div>
                ))
            ) : (
                <h2 className={style.review__empty}>Поки що немає відгуків</h2>
            )}
                

            </div>
            <div className={style.reviews__form__wrapper}>
                <h2 className={style.form__title}>Залишити відгук</h2>
                <form className={style.reviews__form} onSubmit={handleSubmit}>
                    <div className={style.input__wrapper}>
                        <input className={style.rewiews__input} type="text" name="name" placeholder="Введіть ваше імʼя *" required value={formData.name} onChange={handleChange} />
                        <input className={style.rewiews__input} type="email" name="email" placeholder="Email " required value={formData.email} onChange={handleChange} />
                    </div>
                    <textarea className={style.text__area} name="review" cols="30" rows="10" placeholder="Tекст повідомлення *" required value={formData.review} onChange={handleChange}></textarea>
                    <button className={style.form__button} type="submit">{loader ? <Oval height={20} width={20} /> : 'Надіслати'}</button>
                    {hidden && (
                        <h2 className={style.thanks__message}>Дякуємо за ваш відгук</h2>
                    )}
                </form>
            </div>
        </section>
    )
}