import React, {useEffect, useRef} from "react";
import './PictureGrid.scss';
import Random from "../../../../common/Random";
import {pictureUrlList} from "./type";

const PictureGrid = () => {
    const pictureGridTitle: any = useRef(null);
    const pictureGridWrap: any = useRef(null);
    const bigPictureWrap: any = useRef(null);
    const bigPicture: any = useRef(null);
    const pictureUrl: any = pictureUrlList(120);

    const closeBigPicture = () => {
        bigPictureWrap.current.style.display = 'none';
    };

    useEffect(() => {
        //TODO 리액트화 하면 좋고...
        const pictures = document.querySelectorAll('.pictureGridWrap > p');

        pictures.forEach((picture: any, i: number) => {
            picture.onclick = () => {
                bigPictureWrap.current.style.display = 'flex';
                bigPicture.current.style.backgroundImage = picture.style.backgroundImage;
            }
        });

        setTimeout(() => {
            pictureGridTitle.current && (pictureGridTitle.current.style.opacity = 0);
        }, 8500);

        setTimeout(() => {
            pictureGridTitle.current && (pictureGridTitle.current.style.display = 'none');
            pictureGridWrap.current && (pictureGridWrap.current.style.display = 'flex');
        }, 9500);

        const pictureGridInterval = setInterval(() => {
            pictures.forEach((item: any, i: number) => {
                setTimeout(() => {
                    item.style.opacity = 1;
                    item.style.backgroundImage = pictureUrl[Random.getInteger(0, pictureUrl.length)];
                }, 100 * (i % 10) + (i * 10));
                setTimeout(() => {
                    item.style.opacity = 0;
                }, 100 * (i % 10) + (i * 10) + 10000)
            });
        }, 12000);

        return () => {
            clearInterval(pictureGridInterval);
        }
    });

    return(
        <div className={'pictureGrid'}>
            <h1 ref={pictureGridTitle} className={'pictureGridTitle'}>Picture Grid</h1>
            <div ref={pictureGridWrap} className={'pictureGridWrap'}>
                <p /><p /><p /><p /><p /><p /><p /><p /><p /><p />
                <p /><p /><p /><p /><p /><p /><p /><p /><p /><p />
                <p /><p /><p /><p /><p /><p /><p /><p /><p /><p />
                <p /><p /><p /><p /><p /><p /><p /><p /><p /><p />
            </div>
            <div ref={bigPictureWrap} className={'bigPictureWrap'} onClick={closeBigPicture}>
                <p ref={bigPicture} className={'bigPicture'} />
            </div>
        </div>
    )
};

export default PictureGrid;
