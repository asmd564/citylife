import { useEffect } from 'react';
import style from './forBuyers.module.css';
import image from '../../img/Rectangle 984.png'
import { TopProposition } from '../../components/blocks/topProposition/topProposition';
import { Contacts } from '../../components/blocks/contacts/contacts';
import Map from '../../components/blocks/map/map';
import { WhyWe } from '../../components/blocks/whyWe/whyWe';

export const ForBuyers = () => {
    useEffect (() => {
        window.scrollTo(0,0)
    },[])

    return (
        <section className={style.forbuyers}>
            <div className={style.header}>
                <div className={style.header__description__wrapper}>
                    <h1 className={style.header__title}>Послуги для покупців нерухомості</h1>
                    <p className={style.header__description}>Допомагаємо знайти та вибрати найкращу нерухомість для вас  .</p>
                </div>
                <div className={style.header__img__wrapper}>
                    <img src={image} alt="" />
                </div>
            </div>
            <div className={style.details}>
                <h2 className={style.details__title}>Деталі співпраці</h2>
                <div className={style.details__cards}>
                    <div className={style.details__card}>
                        <div className={style.card__wrapper}>
                            <p className={style.card__number}>01.</p>
                            <h3 className={style.card__title}>Зустріч та консультація</h3>
                            <p className={style.card__description}>Агент з продажу нерухомості (ріелтор) з’ясовує Ваші потреби та надає повну і достовірну інформацію щодо актуальних об’єктів нерухомості. Індивідуальний підхід до кожного. Вміння працювати із складним запитом.</p>
                        </div>
                    </div>

                    <div className={style.details__card}>
                        <div className={style.card__wrapper}>
                            <p className={style.card__number}>02.</p>
                            <h3 className={style.card__title}>Пошук об’єктів</h3>
                            <p className={style.card__description}>Агент з продажу нерухомості (ріелтор) підбере той об’єкт, що максимально відповідає Вашим критеріям. Найбільша база актуальних об’єктів нерухомості. Доступ до закритих професійних інформаційних ресурсів. Залучення партнерів до пошуку найкращих пропозицій. Всі підібрані для Вас об’єкти нерухомості проходять первинну перевірку документів.</p>
                        </div>
                    </div>

                    <div className={style.details__card}>
                        <div className={style.card__wrapper}>
                            <p className={style.card__number}>03.</p>
                            <h3 className={style.card__title}>Огляд об’єктів</h3>
                            <p className={style.card__description}>Агент з продажу нерухомості (ріелтор) організовує та координує показ Об’єктів нерухомості у зручний для Вас час. Звертаємо увагу на деталі. Врахуємо всі плюси та мінуси нерухомості , щоб ви отримали найкраще співвідношення ціна/якість.</p>
                        </div>
                    </div>

                    <div className={style.details__card}>
                        <div className={style.card__wrapper}>
                            <p className={style.card__number}>04.</p>
                            <h3 className={style.card__title}>Переговори та укладання угоди</h3>
                            <p className={style.card__description}>Агент з продажу нерухомості (ріелтор) з’ясовує Ваші потреби та надає повну і достовірну інформацію щодо актуальних об’єктів нерухомості. Індивідуальний підхід до кожного. Вміння працювати із складним запитом.</p>
                        </div>
                    </div>

                    <div className={style.details__card}>
                        <div className={style.card__wrapper}>
                            <p className={style.card__number}>05.</p>
                            <h3 className={style.card__title}>Оформлення документів</h3>
                            <p className={style.card__description}>Агент з продажу нерухомості (ріелтор) надає необхідну інформацію щодо пакету необхідних документів для укладання Договору Купівлі-Продажу. Співпрацюємо з кращими юристами та нотаріусами міста. Допомагаємо вирішити складні питання (відновлення документів, виготовлення документів, що стосуються нерухомості).</p>
                        </div>
                    </div>

                    <div className={style.details__card}>
                        <div className={style.card__wrapper}>
                            <p className={style.card__number}>06.</p>
                            <h3 className={style.card__title}>Завершення угоди</h3>
                            <p className={style.card__description}>Агент з продажу нерухомості (ріелтор) супроводжує угоду на всіх етапах і слідкує, щоб були виконані всі попередні домовленості.</p>
                        </div>
                    </div>

                    <div className={style.details__card}>
                        <div className={style.card__wrapper}>
                            <p className={style.card__number}>07.</p>
                            <h3 className={style.card__title}>Передача ключів</h3>
                            <p className={style.card__description}>Агент з продажу нерухомості (ріелтор) за Вашим бажанням може бути присутнім при отримані ключів.</p>
                        </div>
                    </div>

                    <div className={style.details__card}>
                        <div className={style.card__wrapper}>
                            <p className={style.card__number}>08.</p>
                            <h3 className={style.card__title}>Після продажне обслуговування</h3>
                            <p className={style.card__description}>Агент з продажу нерухомості (ріелтор) надає післяпродажну підтримку – допомога в укладанні договорів з житлово-комунальними службами, інформаційна допомога у вирішенні питань з обслуговування та ремонту Об’єкта нерухомості.</p>
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