import { HomeIcon } from "../../../icons/homeIcon";
import style from "./whyWe.module.css";
import { LicenseIcon } from "../../../icons/licenseIcon";
import { PaperIcon } from "../../../icons/paperIcon";
import { TimerIcon } from "../../../icons/timerIcon";

export const WhyWe = () => {
    return (
        <section className={style.whywe}>
            <div className={`${style.whywe__wrapper} container`}>
                <h2 className={style.title}>Чому <span>C<span className={style.green}>i</span>ty li<span className={style.green}>v</span>e</span>?</h2>
                <div className={style.whywe__cards}>
                    <div className={style.whywe__card}>
                        <HomeIcon />
                        <h3 className={style.card__title}>Найбільша база перевіреної нерухомості</h3>
                    </div>
                    <div className={style.whywe__card}>
                        <PaperIcon />
                        <h3 className={style.card__title}>Юридичний <br></br> супровід</h3>
                    </div>
                    <div className={style.whywe__card}>
                        <TimerIcon />
                        <h3 className={style.card__title}>Економія <br></br> Вашого часу</h3>
                    </div>
                    <div className={style.whywe__card}>
                        <LicenseIcon />
                        <h3 className={style.card__title}>Досвідчені професіонали</h3>
                    </div>
                </div>
            </div>
        </section>
    );
}