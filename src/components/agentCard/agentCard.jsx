import { useState, useRef } from "react";
import style from "./agentCard.module.css";
import avatar from "./Frame 21186.png";
import { Link } from 'react-router-dom';

export const AgentCard = ({ isFixed, user, count, anchor }) => {
    const [phone, setPhone] = useState('');
    if (!user || !user.name || !user.surname || !user.position) {
        return null;
    }

    if (!user.phone) {
        return <div>Нет</div>;
    }

    const formatPhoneNumber = (phoneNumber) => {
        const cleaned = ('' + phoneNumber).replace(/\D/g, '');
        const match = cleaned.match(/^(\d{2})(\d{3})(\d{3})(\d{2})(\d{2})$/);

        if (match) {
            return `+${match[1]} ${match[2]} ${match[3]} ${match[4]} ${match[5]}`;
        }

        return phoneNumber;
    };

    const phoneNumbers = user.phone.split(' ').map(formatPhoneNumber);
    return (
        <div className={`${style.agent__card} ${isFixed ? style.fixed : ''}`}>
            <div className={style.agent__card__wrapper}>
                <div className={style.avatar__wrapper}>
                    <div className={style.img__wrapper}>
                        <img src={user.avatar} alt="img" />
                    </div>
                    <div className={style.name__wrapper}>
                        <h2 className={style.name}>{`${user.name} ${user.surname} `}</h2>
                        <p className={style.position}>{user.position}</p>
                    </div>
                </div>
                <p className={style.desc}>Менеджер з продажу нерухомості Агентство нерухомості "City live".</p>
                <div className={style.exp}>Досвід у сфері нерухомості з {user.exp} р.</div>
                <div className={style.projects}>Всього пропозицій: <span>{count}</span> </div>
                <div className={style.phone__wrapper}>
                    {phoneNumbers.map((phoneNumber, index) => (
                        <a key={index} href={`tel:${phoneNumber}`} className={style.phone}>{phoneNumber}</a>
                    ))}
                    <button onClick={anchor} className={style.request}>Замовити дзвінок</button>
                </div>
                
                <div className={style.social}>
                    <a href={`https://t.me/${user.telegram}`} className={style.telegram} target="_blank">Написати у Telegram</a>
                    <a href={`viber://chat?number=${user.viber}`} className={style.viber} target="_blank">Написати у Viber</a>
                </div>
            </div>
        </div>
    )
}