import React from "react";
import style from "./map.module.css";
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { Instagram } from "../../../icons/instagram";
import { Facebook } from "../../../icons/facebook";
import { Teleggram } from "../../../icons/telegram";
import { Whatsapp } from "../../../icons/whatsapp";
import icon from "../../../icons/Marker.png"

const Map = () => {
    const snazzyMapStyle = [
        {
            "featureType": "administrative",
            "elementType": "all",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#cccccc"
              }
            ]
          },
          {
            "featureType": "landscape",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#f2f2f2"
              }
            ]
          }
      ];

    const containerStyle = {
        width: '100%',
        height: '766px',
      };
    
      const center = {
        lat: 48.9195034,
        lng: 24.7188883,
      };
    
      return (
        <section className={`${style.map} container`}>
            <div className={style.map__wrapper}>
                <LoadScript googleMapsApiKey='AIzaSyDVztCGH1CU0r2VLIlTcZnF_Ta_WGOlgw4'>
                <GoogleMap
                    options={{
                        styles: snazzyMapStyle, // Применение стиля к карте
                      }}
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={19}
                >
                    <Marker position={center} title="Маркер" icon={{url: icon}}/>
                </GoogleMap>
                </LoadScript>
            </div>

            <div className={style.contact__card}>
                <div className={style.contact__card__wrapper}>
                    <h2 className={style.card__title}>Контакти</h2>
                    <p className={style.card__adress}>м.Івано-Франківськ,вул. Лепкого 12а, 3-й поверх</p>
                    <div className={style.card__phone__wrpapper}>
                        <div>
                            <a href="tel:+380973101091" className={style.card__phone}>+38 097 310-10-91</a>
                            <a href="tel:+380664696979" className={style.card__phone}>+38 066 469-69-79</a>
                        </div>
                    </div>
                    <a href="#" className={style.card__email}>citylive.if@gmail.com</a>
                    <p className={style.card__citat}>Ми завжди на звʼязку</p>
                    <div className={style.social__wrapper}>
                        <Instagram />
                        <Facebook />
                        <Teleggram />
                        <Whatsapp />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Map;