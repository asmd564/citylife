import style from './default.module.css';

export const Default = ({ user }) => {
    return (
        <section className={style.wrapper}>
            <div className={style.avatar}>
                <img src={user.avatar} alt="" />
            </div>
            <h2 className={style.welcome}>Доброго дня, {user.name}!</h2>
        </section>
    )
    }