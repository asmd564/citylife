import { useState, useEffect } from "react";
import style from "./button.module.css";

export const Button = ({isAvtive, title}) => {
    const [active, setActive] = useState(false);

    useEffect(() => {
        setActive(isAvtive);
    }, [isAvtive]);

    return (
        <button className={`${style.button} ${active ? style.active : ''}`}>{title}</button>
    );
}