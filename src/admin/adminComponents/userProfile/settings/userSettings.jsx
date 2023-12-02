import { useState, useEffect } from "react"
import style from './userSettings.module.css'

export const UserSettings = ({ user }) => {
    return (
        <section className={style.settings}>
            <h2>Налаштуваня</h2>
            <label htmlFor="avatar">Имя</label>
            <input type="file" id="avatar" />

            <label htmlFor="name">Имя</label>
            <input type="text" id="name"/>

            <label htmlFor="surname">Фамилия</label>
            <input type="text" id="surname"/>

            <label htmlFor="email">email</label>
            <input type="email" id="email"/>

            <label htmlFor="phone">email</label>
            <input type="number" id="phone" />

            <label htmlFor="telegram">Telegram</label>
            <input type="text" id="telegram" />

            <label htmlFor="viber">viber</label>
            <input type="text" id="viber" />
        </section>
        
    )
}