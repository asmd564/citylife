import React, { useEffect } from "react";
import style from './reviews.module.css';
import avatar from '../../img/avatar.png';

export const Reviews = () => {
    useEffect (() => {
        window.scrollTo(0,0)
    },[])
    return (
        <section className={style.reviews}>
            <h1 className={style.reviews__title}>Наші відгуки</h1>
            <div className={style.reviews__wrapper}>
                <div className={style.reviews__card}>
                    <div className={style.avatar}>
                        <img src={avatar} alt="" />
                    </div>
                    <div className={style.review__card__wrapper}>
                        <h2 className={style.card__title}>Наталя Світлична <span>|</span> <span>6 липня, 2023</span></h2>
                        <p className={style.card__description}>Хочемо подякувати за допомогу в виборі квартири ріелтору Тані Портецькій та Олі Петрунчак! Квартири які нам запропонувала Таня перевищили наші запроси та очікування. І дійсно в компанії є величезний вибір житла. До вибору квартири віднеслись дуже серйозно та рекомендували на що звернути увагу та нюанси в плануваннях та в інших не менш важливих питаннях про які ми б точно не знали та самі б пропустили їх. Вибором дуже задоволені. </p>
                    </div>
                </div>

                <div className={style.reviews__card}>
                    <div className={style.avatar}>
                        <img src={avatar} alt="" />
                    </div>
                    <div className={style.review__card__wrapper}>
                        <h2 className={style.card__title}>Наталя Світлична <span>|</span> <span>6 липня, 2023</span></h2>
                        <p className={style.card__description}>Хочемо подякувати за допомогу в виборі квартири ріелтору Тані Портецькій та Олі Петрунчак! Квартири які нам запропонувала Таня перевищили наші запроси та очікування. І дійсно в компанії є величезний вибір житла. До вибору квартири віднеслись дуже серйозно та рекомендували на що звернути увагу та нюанси в плануваннях та в інших не менш важливих питаннях про які ми б точно не знали та самі б пропустили їх. Вибором дуже задоволені. </p>
                    </div>
                </div>

                <div className={style.reviews__card}>
                    <div className={style.avatar}>
                        <img src={avatar} alt="" />
                    </div>
                    <div className={style.review__card__wrapper}>
                        <h2 className={style.card__title}>Наталя Світлична <span>|</span> <span>6 липня, 2023</span></h2>
                        <p className={style.card__description}>Хочемо подякувати за допомогу в виборі квартири ріелтору Тані Портецькій та Олі Петрунчак! Квартири які нам запропонувала Таня перевищили наші запроси та очікування. І дійсно в компанії є величезний вибір житла. До вибору квартири віднеслись дуже серйозно та рекомендували на що звернути увагу та нюанси в плануваннях та в інших не менш важливих питаннях про які ми б точно не знали та самі б пропустили їх. Вибором дуже задоволені. </p>
                    </div>
                </div>
            </div>
            <div className={style.reviews__form__wrapper}>
                <h2 className={style.form__title}>Залишити відгук</h2>
                <form className={style.reviews__form}>
                    <div className={style.input__wrapper}>
                        <input type="text" name="name" placeholder="Введіть ваше імʼя *" required/>
                        <input type="email" name="email" placeholder="Email " required/>
                        </div>
                    <textarea name="" id="" cols="30" rows="10" placeholder="Tекст повідомлення *"></textarea>
                    <button className={style.form__button}>Надіслати</button>
                </form>
            </div>
        </section>
    )
}