import { Facebook } from "../../icons/facebook";
import { FooterLogo } from "../../icons/footerLogo";
import { Instagram } from "../../icons/instagram";
import { Teleggram } from "../../icons/telegram";
import { Whatsapp } from "../../icons/whatsapp";
import style from "./footer.module.css";

export const Footer = () => {
    return (
        <footer className={style.footer}>
            <div className={`${style.footer__content__wrapper} container`}>
              <div className={style.contacts__wrapper}>
                <div className={style.phone__wrapper}>
                    <a href="tel:+3800973101091" className={style.phone}>+38 097 310-10-91</a>
                    <a href="tel:+380664696979" className={style.phone}>+38 066 469-69-79</a>
                </div>
                <a href="" className={style.mail}>citylive.if@gmail.com</a>
              </div>
              <div className={style.logo}>
                <FooterLogo />
                <p className={style.logo__text}>Агенство нерухомості.</p>
              </div>
              <div className={style.adress}>
                <p className={style.street}>м. Івано-Франківськ,вул. Лепкого 12, 2-й поверх</p>
                <div className={style.social__wrapper}>
                    <div className={style.instagram}>
                        <Instagram />
                    </div>
                    <div className={style.facebook}>
                        <Facebook />
                    </div>
                    <div className={style.telegram}>
                        <Teleggram />
                    </div>
                    <div className={style.whatsapp}>
                        <Whatsapp />
                    </div>
                </div>
              </div>
            </div>
            <p className={style.copyright}>Агенство нерухомості “CityLive”. Всі права захищено.</p>
        </footer>
    );
}