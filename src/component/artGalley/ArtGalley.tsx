import React, { useRef, useState } from "react";
import './ArtGalley.scss';
import PictureGrid from "./component/pictureGrid/PictureGrid";
import Carousel from "./component/carousel/Carousel";
import PokemonPlus from "./component/pokemonPlus/PokemonPlus";

const ArtGalley = () => {
    const [artGalleyState, setArtGalleyState] = useState(<></>);
    const artGalleyMenuWrap: any = useRef(null);
    const artGalleyWrap: any = useRef(null);

    const backToMenu = () => {
        artGalleyMenuWrap.current.style.opacity = '1';
        artGalleyMenuWrap.current.style.top = '0';
        artGalleyWrap.current.style.opacity = '0';
        artGalleyWrap.current.style.top = 'calc(100% - 80px)';
        setTimeout(() => {
            setArtGalleyState(<></>);
        }, 1000);
    };

    const goToGalley = () => {
        artGalleyMenuWrap.current.style.opacity = '0';
        artGalleyMenuWrap.current.style.top = '-100%';
        artGalleyWrap.current.style.opacity = '1';
        artGalleyWrap.current.style.top = '0';
    };

    return (
        <div className={'artGalley'} >
            <div ref={artGalleyMenuWrap} className={'artGalleyMenuWrap'}>
                <div className={'artGalleyMenu'}>
                    <p onClick={() => { setArtGalleyState(<Carousel />); goToGalley(); }}>Carousel</p>
                    <p onClick={() => { setArtGalleyState(<PictureGrid />); goToGalley(); }}>Picture Grid</p>
                    <p onClick={() => { setArtGalleyState(<PokemonPlus />); goToGalley(); }}>Pokemon Plus</p>
                    <p onClick={() => { }}>Drive</p>
                    <p onClick={() => { }}>Cube</p>
                    <p onClick={() => { }}>f</p>
                </div>
            </div>
            <div ref={artGalleyWrap} className={'artGalleyWrap'} >
                {artGalleyState}
                <button className={'artGalleyMenuButton'} onClick={() => { backToMenu() }}>
                    <i className={"fa fa-angle-double-down"}></i>
                </button>
            </div>
        </div>
    )
};

export default ArtGalley;
