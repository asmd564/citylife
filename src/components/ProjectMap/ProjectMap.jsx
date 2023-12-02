import React, { useState } from "react";
import style from "./ProjectMap.module.css";
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import icon from "../../icons/Marker.png"

const ProjectMap = ({lat, lng, width}) => {

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
        width: '848px',
        height: '492px',
      };
    
      const center = {
        lat: lat,
        lng: lng,
      };
    
      return (
        <section className={`${style.map} container`}>
            <h2 className={style.title}>Адреса</h2>
                <LoadScript googleMapsApiKey='AIzaSyDVztCGH1CU0r2VLIlTcZnF_Ta_WGOlgw4'>
                <GoogleMap
                    key={`${lat}-${lng}`}
                    options={{
                        styles: snazzyMapStyle,
                        mapTypeControl: false,
                        fullscreenControl: false, // Показать кнопку открытия карты на весь экран
                        streetViewControl: false, // Скрыть кнопку "человечек"
                        zoomControl: false
                      }}
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={16}
                >
                    <Marker position={center} title="Маркер" icon={{url: icon}}/>
                </GoogleMap>
                </LoadScript>
        </section>
    );
}

ProjectMap.defaultProps = {
  lat: 48.91950,
  lng: 24.71888,
};

export default ProjectMap;