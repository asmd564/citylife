import React, {useEffect} from "react";
import { MainPageBlock } from "../../components/blocks/mainPageBlock/mainPageBlock";
import { TopProposition } from "../../components/blocks/topProposition/topProposition";
import { AnotherPropo } from "../../components/blocks/anotherPropo/anotherPropo";
import { Contacts } from "../../components/blocks/contacts/contacts";
import { WhyWe } from "../../components/blocks/whyWe/whyWe";
import Map from "../../components/blocks/map/map";

export const HomePagge = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
    return (
        <>
        <MainPageBlock />
        <TopProposition />
        <AnotherPropo />
        <Contacts />
        <WhyWe />
        <Map />
        </>
    );
}