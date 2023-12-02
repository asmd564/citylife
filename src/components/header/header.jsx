import React, { useState, useEffect } from "react";
import style from "./header.module.css";
import { Logo } from "../../icons/logo";
import { Favorite } from "../../icons/favorite";
import { Link, NavLink, useLocation } from "react-router-dom";

export const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();
    const isActiveRoute = (route) => location.pathname.includes(route);

    const [cardData, setCardData] = useState(() => {
        const storedData = localStorage.getItem('cardData');
        return storedData ? JSON.parse(storedData) : [];
    });

    const [count, setCount] = useState(() => {
        const storedData = localStorage.getItem('cardData');
        return storedData ? JSON.parse(storedData).length : 0;
    });

    useEffect(() => {
        localStorage.setItem('cardData', JSON.stringify(cardData));
        setCount(cardData.length);
    }, [cardData]);


    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    }

    const closeMenu = () => {
        setMenuOpen(false);
      };

      const handleCountChange = () => {
        const storedData = localStorage.getItem('cardData');
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            setCardData(parsedData);
            setCount(parsedData.length);
        }
    };

    useEffect(() => {
        handleCountChange();
    }, []);
    return (
        <header className={style.header}>
            <div className={`${style.header__wrapper} container`}>
                <div className={style.logo__wrapper}>
                    <NavLink to="/"><Logo /></NavLink>
                </div>
                <nav className={style.header__nav}>
                    <ul className={style.nav__items}>
                        <li className={style.nav__item}><NavLink to="/" className={style.nav__link} onClick={closeMenu}>Головна</NavLink></li>
                        <li className={`${style.nav__item} ${style.position}`}>
                            <button className={isActiveRoute("/for-sellers") || isActiveRoute("/for-buyers") ? `${style.nav__button} ${style.nav__active}` : style.nav__button} onClick={toggleMenu}>
                                Послуги
                            </button>
                            {menuOpen && (
                                <div className={style.services__menu}>
                                    <div className={style.services__menu__wrapper}>
                                        <NavLink to="/for-sellers" className={style.nav__link} onClick={closeMenu}>Для  продавців</NavLink>
                                        <NavLink to="/for-buyers" className={style.nav__link} onClick={closeMenu}>Для  покупців</NavLink>
                                    </div>
                                </div>
                            )}
                            </li>
                        <li className={style.nav__item}><NavLink to="/about" className={style.nav__link} onClick={closeMenu}>Про нас</NavLink></li>
                        <li className={style.nav__item}><NavLink to="/reviews" className={style.nav__link} onClick={closeMenu}>Відгуки</NavLink></li>
                        <li className={style.nav__item}><NavLink to="/contact" className={style.nav__link} onClick={closeMenu}>Контакти</NavLink></li>
                    </ul>
                </nav>
                <div className={style.header__buttons}>
                <div className={style.favorite}>
                    <Link to="/favorite" onClick={closeMenu}>
                        <Favorite/>
                            <div className={style.count}>{cardData.length}</div>
                    </Link>
                </div>
                    <button className={style.phone}>Замовити дзвінок</button>
                    <div className={`${style.burger__menu} ${style.active}`}><span></span></div>
                </div>
            </div>
        </header>
    );
}