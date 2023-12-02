import React, { useEffect } from "react";
import style from './forSellers.module.css';
import { TopProposition } from "../../components/blocks/topProposition/topProposition";
import { Contacts } from "../../components/blocks/contacts/contacts";
import { WhyWe } from "../../components/blocks/whyWe/whyWe";
import Map from "../../components/blocks/map/map";

export const ForSellers = () => {
    useEffect (() => {
        window.scrollTo(0,0)
    },[])
    return (
        <section className={style.forsellers}>
            <div className={style.forsellers__header__wrapper}>
                <h1 className={style.header__title}>Послуги для продавців нерухомості</h1>
                <p className={style.header__description}>Допомагаємо зробити процес продажу нерухомості легким та надійним .</p>
            </div>
            <div className={style.cards}>
                <h2 className={style.cards__title}>Деталі співпраці</h2>
                <div className={style.detail__cards1}>
                    <div className={style.details__card}>
                        <div className={style.card__wrapper}>
                            <p className={style.card__number}>01.</p>
                            <h3 className={style.card__title}>Визначення ринкової вартості об’єкта нерухомості:</h3>
                                <ul className={style.card__list}>
                                    <li className={style.card__item}>
                                        Глибокий аналіз переваг квартири, враховуючи унікальні характеристики.;
                                    </li>
                                    <li className={style.card__item}>
                                        Систематичний маркетинговий аналіз для точного визначення ринкової ціни;
                                    </li>
                                    <li className={style.card__item}>
                                        Прогноз орієнтованого терміну продажу, опираючись на актуальні тенденції.
                                    </li>
                                </ul>
                        </div>
                    </div>
                    <div className={style.details__card}>
                        <div className={style.card__wrapper}>
                            <p className={style.card__number}>02.</p>
                            <h3 className={style.card__title}>Підготовка об'єкта до Продажу</h3>
                            <ul className={style.card__list}>
                                    <li className={style.card__item}>
                                        Індивідуальні рекомендації щодо естетичного покращення квартири;
                                    </li>
                                    <li className={style.card__item}>
                                        Детальне визначення цільової аудиторії з урахуванням різних ринкових 
                                    </li>
                                    <li className={style.card__item}>
                                        Розробка стратегічного маркетингового плану, враховуючи актуальні тренди;
                                    </li>
                                    <li className={style.card__item}>
                                        Професійні фотографії та згладжені, привабливі текстові матеріали.
                                    </li>
                                </ul>
                        </div>
                    </div>
                    <div className={style.details__card}>
                        <div className={style.card__wrapper}>
                            <p className={style.card__number}>03.</p>
                            <h3 className={style.card__title}>Просування об'єкта на ринку нерухомості</h3>
                            <ul className={style.card__list}>
                                    <li className={style.card__item}>
                                        Активне інформування наявних клієнтів про Ваш об'єкт нерухомості;
                                    </li>
                                    <li className={style.card__item}>
                                         Ефективна реклама в ЗМІ, використовуючи креативні та цільові підходи;
                                    </li>
                                    <li className={style.card__item}>
                                        Розробка стратегічного маркетингового плану, враховуючи актуальні тренди;
                                    </li>
                                </ul>
                        </div>
                    </div>
                </div>
                <div className={style.detail__cards2}>
                <div className={`${style.details__card} ${style.card__width}`}>
                        <div className={style.card__wrapper}>
                            <p className={style.card__number}>04.</p>
                            <h3 className={style.card__title}>Ефективні покази та економія Вашого часу</h3>
                            <ul className={style.card__list}>
                                    <li className={style.card__item}>
                                        Проведення показів із детальним узгодженням умов для гарантії безпеки всіх сторін;
                                    </li>
                                    <li className={style.card__item}>
                                        Зручність для клієнта: можливість зберігання ключів у нас, яка фіксується у відповідному документі.
                                    </li>
                                </ul>
                        </div>
                    </div>

                    <div className={`${style.details__card} ${style.card__width}`}>
                        <div className={style.card__wrapper}>
                            <p className={style.card__number}>05.</p>
                            <h3 className={style.card__title}>Підготовка необхідних документів для Продажу</h3>
                            <ul className={style.card__list}>
                                    <li className={style.card__item}>
                                        Швидка та професійна обробка документації;
                                    </li>
                                    <li className={style.card__item}>
                                        Допомога у виготовленні необхідної документації для ефективної проведення угоди.
                                    </li>
                                </ul>
                        </div>
                    </div>
                </div>
                <div className={style.detail__cards2}>
                <div className={`${style.details__card} ${style.card__width2}`}>
                        <div className={style.card__wrapper}>
                            <p className={style.card__number}>06.</p>
                            <h3 className={style.card__title}>Контроль повного розрахунку за нерухомість</h3>
                            <ul className={style.card__list}>
                                    <li className={style.card__item}>
                                        Детальна перевірка та контроль фінансових аспектів при розрахунку.
                                    </li>
                                </ul>
                        </div>
                    </div>

                    <div className={`${style.details__card} ${style.card__width2}`}>
                        <div className={style.card__wrapper}>
                            <p className={style.card__number}>07.</p>
                            <h3 className={style.card__title}>Гарантія Конфіденційності угоди</h3>
                            <ul className={style.card__list}>
                                    <li className={style.card__item}>
                                        Абсолютна забезпеченість конфіденційності під час усього процесу угоди.
                                    </li>
                                </ul>
                        </div>
                    </div>
                </div>
            </div>
            <TopProposition />
            <Contacts />
            <WhyWe />
            <Map />
        </section>
    )
}