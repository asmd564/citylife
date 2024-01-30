import React, { useState, useEffect } from "react";
import style from "./adminHeader.module.css";
import { Logo } from "../../../icons/logo";
import { Link, NavLink, useParams } from "react-router-dom";
import { ShevronDown } from "../../../icons/shevronDown";
import { UserIcon } from "../../../icons/userIcon";
import { UserEdit } from "../../../icons/userEdit";
import { Exit } from "../../../icons/exit";
import { useAuth } from "../../../context/authContext";

export const AdminHeader = ({ id, user }) => {
    const { logout } = useAuth();
    const [open, setOpen] = useState(false);

    const handleLoguot = () => {
        logout();
    }

    const toggleAdmin = () => {
        setOpen(!open);
    }

    const closeAdmin = () => {
        setOpen(false);
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (open && !event.target.closest(`.${style.profile__details}`) && !event.target.closest(`.${style.profile}`)) {
                setOpen(false);
            }
        };

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [open]);

    return (
        <header className={style.header}>
            <div className={`${style.header__wrapper} container`}>
                <div className={style.logo__wrapper}>
                    <NavLink to={`/admin/dashboard/${id}`}><Logo /></NavLink>
                </div>
                <nav className={style.header__nav}>
                    <ul className={style.nav__items}>
                        {user && user.role &&(
                            <li className={style.nav__item}><NavLink to={`/admin/dashboard/${id}/users`} activeClassName={style.activeLink} className={style.nav__link}>Працівники</NavLink></li>
                        )}
                        <li className={style.nav__item}><NavLink to={`/admin/dashboard/${id}/my-products`} className={style.nav__link} active={style.activeLink}>Мої оголошення</NavLink></li>
                        <li className={style.nav__item}><NavLink to={`/admin/dashboard/${id}/add-product`} activeClassName={style.activeLink} className={style.nav__link}>Додати обʼєкт</NavLink></li>
                        
                    </ul>
                </nav>
                <div className={style.header__buttons}>
                <div className={style.favorite}></div>
                    <button className={style.profile} onClick={toggleAdmin}><UserIcon /> Мій профіль <ShevronDown /></button>
                    {open ? (
                         <div className={style.profile__details}>
                         <div className={style.profile__details__wrapper}>
                             <div className={style.avatar__wrapper}>
                                 <div className={style.avatar}>
                                     <img src={user.avatar} alt="" />
                                 </div>
                                 <h3 className={style.name}>{`${user.name} ${user.surname}`}</h3>
                                 <p className={style.email}>{user.email}</p>
                             </div>
                             <div className={style.profile__links__wrapper}>
                                 <Link to={`/admin/dashboard/${id}/profile`} onClick={toggleAdmin}><div className={style.profile__link}><UserEdit />Мій профіль</div></Link>
                                 <button className={style.exit__link} onClick={handleLoguot} ><Exit />Вихід</button>
                             </div>
                         </div>
                     </div>
                    ) : (
                        <></>
                    )}
                   
                    <div className={`${style.burger__menu} ${style.active}`}><span></span></div>
                </div>
            </div>
        </header>
    );
}