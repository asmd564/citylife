import React, { useState, useRef } from 'react';
import style from "./contacts.module.css";
import { Oval } from 'react-loader-spinner';

export const Contacts = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [zapyt, setZapyt] = useState('');
    const [hidden, setHidden] = useState('Новое сглошение');
    const [loader, setLoader] = useState(false);
    const [ok, setOk] = useState(false);
    const [error, setError] = useState(false);

    const handleSubmit = async (e) => {
        setLoader(true)
        e.preventDefault();
        const data = { name, phone, zapyt };
        try {
          const response = await fetch(`${process.env.REACT_APP_BE_HOST}/email`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          });
    
          if (response.ok) {
            // Обработка успешного ответа
            console.log('Запрос успешно отправлен!');
            setLoader(false);
            setOk(true);
          } else {
            // Обработка ошибки
            console.error('Ошибка при отправке запроса.');
            setError(true);
            setLoader(false);
          }
        } catch (error) {
          setError(true);
          setLoader(false);
          console.error('Произошла ошибка:', error);
        }
      };

    return (
        <section className={style.contacts}>
            <div className={style.contacts__wrapper}>
                <h2 className={style.title}>Не знайшли що хотіли?</h2>
                <p className={style.subtitle}>Заповніть коротку форму і ми підберемо для Вас найкращі варіанти.</p>
                <form onSubmit={handleSubmit} className={style.form}>
                    <div className={style.form__wrapper}>
                        <div className={style.input__wrapper}>
                        <input 
                                className={style.hidden}
                                type="text"
                                required
                                name="subject"
                                id="subject"
                                placeholder=""
                                value={hidden}
                                onChange={(e) => setHidden(e.target.value)}
                            />
                            <input 
                                type="text"
                                required
                                name="name"
                                id="name"
                                placeholder="Введіть ваше імʼя *"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className={style.input}
                            />
                            <input
                                type="tel"
                                required
                                name="phone"
                                id="phone"
                                placeholder="Номер телефону *"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className={style.input}
                            />
                        </div>
                    <textarea 
                        type="text"
                        required
                        name="zapyt"
                        id="zapyt"
                        className={style.input1}
                        placeholder="Розкажіть що ви шукаєте"
                        value={zapyt}
                        onChange={(e) => setZapyt(e.target.value)}
                    />
                    </div>
                    {ok && (
                      <p className={style.ok}>Ваш запит надіслано</p>
                    )}
                    {error && (
                      <p className={style.error}>Виникла помилка</p>
                    )}
                    <button className={style.form__button}>{loader ? <Oval height={20} width={20}/> : 'Надіслати'}</button>
                </form>
            </div>
        </section>
    );
}