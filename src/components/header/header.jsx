import React from "react";
import style from "./header.module.css";
import { Logo } from "../../icons/logo";
import { Favorite } from "../../icons/favorite";
import { Link, NavLink } from "react-router-dom";

export const Header = () => {
    return (
        <header className={style.header}>
            <div className={`${style.header__wrapper} container`}>
                <div className={style.logo__wrapper}>
                    <NavLink to="/"><Logo /></NavLink>
                </div>
                <nav className={style.header__nav}>
                    <ul className={style.nav__items}>
                        <li className={style.nav__item}><NavLink to="/" className={style.nav__link}>Головна</NavLink></li>
                        <li className={style.nav__item}><NavLink to="/services" className={style.nav__link}>Послуги</NavLink></li>
                        <li className={style.nav__item}><NavLink to="/about" className={style.nav__link}>Про нас</NavLink></li>
                        <li className={style.nav__item}><NavLink to="/opinions" className={style.nav__link}>Відгуки</NavLink></li>
                        <li className={style.nav__item}><NavLink to="/contact" className={style.nav__link}>Контакти</NavLink></li>
                    </ul>
                </nav>
                <div className={style.header__buttons}>
                <div className={style.favorite}><Link to="/favorite"><Favorite/></Link></div>
                    <button className={style.phone}>Замовити дзвінок</button>
                    <div className={`${style.burger__menu} ${style.active}`}><span></span></div>
                </div>
            </div>
        </header>
    );
}