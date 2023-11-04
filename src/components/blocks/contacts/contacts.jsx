import style from "./contacts.module.css";

export const Contacts = () => {
    return (
        <section className={style.contacts}>
            <div className={style.contacts__wrapper}>
                <h2 className={style.title}>Не знайшли що хотіли?</h2>
                <p className={style.subtitle}>Заповніть коротку форму і ми підберемо для Вас найкращі варіанти.</p>
                <form action="post" className={style.form}>
                    <div className={style.form__wrapper}>
                        <div className={style.input__wrapper}>
                            <input type="text" required placeholder="Введіть ваше імʼя *"/>
                            <input type="tel" required placeholder="Номер телефону *"/>
                        </div>
                    <textarea type="text" required className={style.input1} placeholder="Розкажіть що ви шукаєте"/>
                    </div>
                    <button className={style.form__button}>Надіслати</button>
                </form>
            </div>
        </section>
    );
}