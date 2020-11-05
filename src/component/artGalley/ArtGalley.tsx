import React, {useState} from "react";
import './ArtGalley.scss';
import PictureGrid from "./component/pictureGrid/PictureGrid";
import BGMButton from "../bgmButton/BGMButton";

const ArtGalley = () => {
    const [artGalleyState, setArtGalleyState] = useState(<></>);
    const [artGalleyMenu, setArtGalleyMenu] = useState(true);

    return(
        <div className={'artGalley'}>
            <div className={'artGalleyWrap'}>
                {artGalleyState}
            </div>
            {
                artGalleyMenu &&
                <div className={'artGalleyMenu'}>
                    <p onClick={() => {setArtGalleyState(<PictureGrid/>); setArtGalleyMenu(false)}}>Picture Grid</p>
                    <p onClick={() => {setArtGalleyState(<></>); setArtGalleyMenu(false)}}>Parrot</p>
                    <p onClick={() => {setArtGalleyState(<></>); setArtGalleyMenu(false)}}>Drive</p>
                    <p onClick={() => {setArtGalleyState(<></>); setArtGalleyMenu(false)}}>Cube</p>
                </div>
            }
            <BGMButton audio={new Audio(require('../../resources/sound/artGalley/Buttercup.mp3'))}/>
        </div>
    )
};

export default ArtGalley;