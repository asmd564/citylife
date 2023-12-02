import React, { useState, useEffect } from 'react';
import { ProductCard } from '../../components/ui/product__card/product__card';
import style from './favorite.module.css';
import { TopProposition } from '../../components/blocks/topProposition/topProposition';
import { Contacts } from '../../components/blocks/contacts/contacts';
import { WhyWe } from '../../components/blocks/whyWe/whyWe';
import Map from '../../components/blocks/map/map';

export const Favorite = () => {
    const [cardData, setCardData] = useState(null);

    useEffect(() => {
      window.scrollTo(0,0);
    },[]);

    useEffect(() => {
      const storedData = localStorage.getItem('cardData');
      if (storedData) {
        setCardData(JSON.parse(storedData));
      }
    }, [cardData]);
  
    return (
      <>
      <section className={style.favorite}>
        <h1 className={style.favorite__title}>Обрані пропозиції</h1>
        <div className={style.favorite__wrapper}>
        {Array.isArray(cardData) && cardData.length > 0  ? (
            cardData.map(item => (
              <ProductCard key={item.id} product={item} />
            ))
        ) : (
          <p>У вас поки що немає обраних пропозицій</p>
        )}
        </div>
      </section>
      <TopProposition />
      <Contacts />
      <WhyWe />
      <Map />
      </>
    );
};  