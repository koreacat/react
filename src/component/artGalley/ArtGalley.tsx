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
                    <p onClick={() => {}}>...</p>
                </div>
            }
            <BGMButton />
        </div>
    )
};

export default ArtGalley;