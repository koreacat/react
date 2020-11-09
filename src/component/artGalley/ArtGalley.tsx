import React, {useRef, useState, useCallback, useEffect} from "react";
import './ArtGalley.scss';
import PictureGrid from "./component/pictureGrid/PictureGrid";
import BGMButton from "../bgmButton/BGMButton";

const ArtGalley = () => {
    const [artGalleyState, setArtGalleyState] = useState(<></>);
    const [artGalleyMenu, setArtGalleyMenu] = useState(true);
    const carousel: any = useRef(null);
    let currdeg = 0;
    let movable = false;
    let previousX = 0;
    let direction = -1;


    useEffect(() => {
        const interval = setInterval(() => {
            currdeg += direction;
            carousel.current && (carousel.current.style.transform = `rotateY(${currdeg}deg)`);
        }, 100);
        return (() => {
            clearInterval(interval);
        })
    });


    const prev = () => {
        if(currdeg % 60 === 0){
            currdeg += 60
        }else if(currdeg % 60 < 0) {
            currdeg += -(currdeg % 60)
        }else {
            currdeg += 60 - currdeg % 60
        }
        carousel.current.style.transform = `rotateY(${currdeg}deg)`;
        direction = 0;
    }

    const next = () => {
        if(currdeg % 60 === 0){
            currdeg -= 60
        }else if(currdeg % 60 < 0) {
            currdeg -= 60 + currdeg % 60
        }else {
            currdeg -= currdeg % 60
        }
        carousel.current.style.transform = `rotateY(${currdeg}deg)`;
        direction = 0;
    }

    const onMouseDown = useCallback(
		(e: React.MouseEvent) => {
			switch (e.button) {
				case 0:
                    movable = true;
                    previousX = e.clientX;
					break;
			}
		},
		[]
	);

    const onMouseUp = useCallback(
		(e: React.MouseEvent) => {
            e.preventDefault();
            movable = false;
		},
		[]
	);

    const onMouseMove = useCallback(
		(e: React.MouseEvent) => {
            if(movable){
                let diff = (previousX - e.clientX);
                currdeg = currdeg - diff/2;
                carousel.current.style.transform = `rotateY(${currdeg}deg)`;
                previousX = e.clientX;
                diff < 0 ? direction = 1 : direction = -1;
            }
		},
		[]
    );
    
    const onMouseLeave = useCallback(
		(e: React.MouseEvent) => {
            e.preventDefault();
            movable = false;
		},
		[]
	);

    return(
        <div className={'artGalley'} onMouseDown={onMouseDown} onMouseMove={onMouseMove} onMouseUp={onMouseUp} onMouseLeave={onMouseLeave}>
            <div className={'artGalleyWrap'} >
                {artGalleyState}
            </div>
            {
                artGalleyMenu &&
                <div>
                    <div ref={carousel} className={'artGalleyMenuWrap'}>
                        <div className={'artGalleyMenu'}>
                            <p className={'a'} onClick={() => {setArtGalleyState(<PictureGrid/>); setArtGalleyMenu(false)}}>Picture Grid</p>
                            <p className={'b'} onClick={() => {setArtGalleyState(<></>); setArtGalleyMenu(false)}}>Parrot</p>
                            <p className={'c'} onClick={() => {setArtGalleyState(<></>); setArtGalleyMenu(false)}}>Drive</p>
                            <p className={'d'} onClick={() => {setArtGalleyState(<></>); setArtGalleyMenu(false)}}>Cube</p>
                            <p className={'e'} onClick={() => {setArtGalleyState(<></>); setArtGalleyMenu(false)}}>e</p>
                            <p className={'f'} onClick={() => {setArtGalleyState(<></>); setArtGalleyMenu(false)}}>f</p>
                        </div>
                    </div>
                    <button className={'artGalletPrev'} onClick={prev}>prev</button>
                    <button className={'artGalleyNext'} onClick={next}>next</button>
                </div>
                
            }
            <BGMButton audio={new Audio(require('../../resources/sound/artGalley/Buttercup.mp3'))}/>
        </div>
    )
};

export default ArtGalley;