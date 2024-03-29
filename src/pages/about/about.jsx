import React, { useEffect, useState, useRef } from "react";
import style from './about.module.css';
import firstblockimg from "../../img/Rectangle 827.png";
import secondblockimg from '../../img/Rectangle 827 (1).png';
import missionimg1 from '../../img/Rectangle 828.png';
import missionimg2 from '../../img/Rectangle 829.png';
import image from '../../img/Frame 21230.png';
import { Contacts } from "../../components/blocks/contacts/contacts";
import { WhyWe } from "../../components/blocks/whyWe/whyWe";
import Map from "../../components/blocks/map/map";
import axios from "axios";
import { AgentCard } from "../../components/agentCard/agentCard";
import { Close } from "../../icons/close";

export const About = () => {
    const[users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [products, setProducts] = useState([]);
    const [count, setCount] = useState(0);
    const contactsRef = useRef(null);

    const getUsers = async () => {
        try{
           const response = await axios.get(`${process.env.REACT_APP_BE_HOST}/users`);
           const productsResponse = await axios.get(`${process.env.REACT_APP_BE_HOST}/products`);
            const filter = response.data.filter(user => user.role !== true);
            setUsers(filter);
            setProducts(productsResponse.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getUsers()
    },[])

    useEffect (() => {
        window.scrollTo(0,0)
    },[])

    const openUserPopup = (user) => {
        setSelectedUser(user);
        setCount(products.filter(product => product.user_id === user.id).length);
        document.body.classList.add('body-no-scroll');
      };
    
      const closeUserPopup = () => {
        setSelectedUser(null);
        document.body.classList.remove('body-no-scroll');
      };

      const scrollToAnchor = () => {
        if (contactsRef.current) {
          contactsRef.current.scrollIntoView({ behavior: 'smooth' });
          setSelectedUser(null);
          document.body.classList.remove('body-no-scroll');
        }
      };

    return (
        <section className={style.about}>
            <div className={style.first__section}>
                <div className={style.first__section__container}>
                    <div className={style.first__section__wrapper}>
                        <div className={style.first__section__title__wrapper}>
                            <h1 className={style.first__section__title}>Команда досвідчених професіоналів</h1>
                            <p className={style.first__section__description}>Наша команда допоможе вам безпечно, швидко та вигідно орендувати, продати або купити нерухомість в Івано-Франківську. Ви захочете тут жити!</p>
                            <button className={style.first__section__button} onClick={scrollToAnchor}>Наші контакти</button>
                        </div>
                    </div>
                    <div className={style.first__section__img}>
                        <img src={firstblockimg} alt="" />
                    </div>
                </div>    
            </div>
            <div className={`${style.about__section} container`}>
                <div className={style.about__section__first__wrapper}>
                    <div className={`${style.first__section__img} ${style.width}`}>
                        <img src={secondblockimg} alt="" />
                    </div>
                    <div className={style.about__section__first}>
                        <h2 className={style.about__section__title}>Про нас</h2>
                        <p className={style.about__description}>
                        Агентство Нерухомості CITY LIVE було засновано в 2013 році. Нашою метою було створення професійного та якісного сервісу на ринку нерухомості Івано-Франківська.
                        <br></br> <br />
                        Ми розуміємо, що одне із найсерйозніших питань в житті більшості людей — це житлове питання. І прагнемо збудувати довірчі стосунки зі своїми клієнтами, щоб кожна угода була комфортною та безпечною.
                        <br></br> <br />
                        Команда професійних агентів з нерухомості завжди на вашій стороні. Ми знаємо Ваші потреби і як знайти найкращий об’єкт для Вас.
                        </p>
                    </div>
                </div>
            </div>
            <div className={`${style.mission} container`}>
                <h3 className={style.mission__title}>Наша місія - стати партнером для кожного клієнта , здійснюючи успішні та безпечні угоди.</h3>
                <div className={style.mission__wrapper}>
                    <p className={style.mission__description}>
                    Агентство Нерухомості CITY LIVE – Ваш надійний партнер у справах нерухомості в м. Івано-Франківськ! За 10 років ми уклали більше 1700 угод на ринку нерухомості. У нас є знання, досвід та навички, які допомагають ефективно працювати з ринком та забезпечують професійний підхід до всіх аспектів операцій з нерухомістю.
                    <br></br><br />
                    Ми допомагаємо нашим клієнтам ефективно купувати, продавати, орендувати та управляти нерухомістю. Наша місія - стати партнером для кожного клієнта , здійснюючи успішні та безпечні угоди.
                    </p>
                    <div className={style.mission__img__wrapper}>
                        <div className={style.mission__img}>
                            <img src={missionimg1} alt="" />
                        </div>
                        <div className={style.mission__img}>
                            <img src={missionimg2} alt="" />
                        </div>
                    </div>
                </div>
            </div>
            <div className={style.section__img}>
                <img src={image} alt="" />
            </div>
            <div className={style.our__team}>
                <h2 className={style.team__title}>Наша команда</h2>
                <div className={style.team__cards__wrapper}>

                {users && users.length > 0 ? (
                    users.map(user => (
                    <div className={style.team__card} key={user.id} onClick={() => openUserPopup(user)}>
                        <div className={style.avatar}>
                            <img src={user.avatar} alt="" />
                        </div>
                        <p className={style.card__name}>{user.name}</p>
                        <p className={style.card__surname}>{user.surname}</p>
                    </div>
                    ))
                        
                    ) : (
                        <h2>Помилка</h2>
                    )}

                </div>
            </div>
            {selectedUser && (
                <div className={style.agentCard__container}>
                    <div className={style.agentCard__wrapper}>
                        <div className={style.close} onClick={closeUserPopup}><Close /></div>
                        <AgentCard user={selectedUser} count={count} anchor={scrollToAnchor}/>
                    </div>
                </div>
            )}
            <div ref={contactsRef}>
                <Contacts />
            </div>
            <WhyWe />
            <Map />
        </section>
    )
}