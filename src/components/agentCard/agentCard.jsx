import { useState } from "react";
import style from "./agentCard.module.css";
import avatar from "./Frame 21186.png"

export const AgentCard = ({ isFixed, user }) => {
    const [phone, setPhone] = useState('');
    if (!user || !user.name || !user.surname || !user.position) {
        return null;
    }
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
                <div className={style.projects}>Всього пропозицій: <span>6</span> </div>
                <a href="tel:" className={style.phone}>{user.phone}</a>
                <a href="" className={style.request}>Замовити дзвінок</a>
                <div className={style.social}>
                    <a className={style.telegram}>Написати у Telegram</a>
                    <a className={style.viber}>Написати у Viber</a>
                </div>
            </div>
        </div>
    )
}