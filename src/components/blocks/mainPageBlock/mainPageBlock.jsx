import React, { useState } from "react";
import style from "./mainPageBlock.module.css";
import { Button } from "../../ui/button/button";
import { Link } from "react-router-dom";

export const MainPageBlock = () => {
    const [active, setActive] = useState('продажа')
    return (
        <section className={style.main}>
            <div className={style.main__wrapper}>
                <h1 className={style.main__title}>Обирайте кращі місця для життя в кращому місті України</h1>
                <div className={style.main__buttons__wrapper}>
                    <Link to="/objects?category=sale"><Button title="Продаж" isAvtive={true}/></Link>
                    <Link to="/objects?category=rent"><Button title="Оренда"/></Link>
                </div>
            </div>
        </section>
    );
}