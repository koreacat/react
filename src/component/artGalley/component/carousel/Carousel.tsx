import React, { useRef, useState, useCallback, useEffect } from "react";
import BGMButton from "../../../bgmButton/BGMButton";
import './Carousel.scss';
const Carousel = () => {
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
        if (currdeg % 60 === 0) {
            currdeg += 60
        } else if (currdeg % 60 < 0) {
            currdeg += -(currdeg % 60)
        } else {
            currdeg += 60 - currdeg % 60
        }
        carousel.current.style.transform = `rotateY(${currdeg}deg)`;
        direction = 0;
    }

    const next = () => {
        if (currdeg % 60 === 0) {
            currdeg -= 60
        } else if (currdeg % 60 < 0) {
            currdeg -= 60 + currdeg % 60
        } else {
            currdeg -= currdeg % 60
        }
        carousel.current.style.transform = `rotateY(${currdeg}deg)`;
        direction = 0;
    }

    const onMouseDown = useCallback((e: React.MouseEvent) => {
        switch (e.button) {
            case 0:
                movable = true;
                previousX = e.clientX;
                break;
        }
    },[]);

    const onMouseUp = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        movable = false;
    },[]);

    const onMouseMove = useCallback((e: React.MouseEvent) => {
        if (movable) {
            let diff = (previousX - e.clientX);
            currdeg = currdeg - diff / 2;
            carousel.current.style.transform = `rotateY(${currdeg}deg)`;
            previousX = e.clientX;
            diff < 0 ? direction = 1 : direction = -1;
        }
    },[]);

    const onMouseLeave = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        movable = false;
    },[]);

    const onTouchStart = useCallback((e: React.TouchEvent) => {
        movable = true;
        previousX = e.touches[0].clientX;
    },[]);

    const onTouchEnd = useCallback(() => {
        movable = false;
    },[]);

    const onTouchMove = useCallback((e: React.TouchEvent) => {
        if (movable) {
            let diff = (previousX - e.touches[0].clientX);
            currdeg = currdeg - diff / 2;
            carousel.current.style.transform = `rotateY(${currdeg}deg)`;
            previousX = e.touches[0].clientX;
            diff < 0 ? direction = 1 : direction = -1;
        }
    },[]);

    return (
        <div className={'carousel'}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseLeave}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}>
            <div ref={carousel} className={'carouselWrap'}>
                <div className={'carouselItem'}>
                    <p className={'a'} >a</p>
                    <p className={'b'} >b</p>
                    <p className={'c'} >c</p>
                    <p className={'d'} >d</p>
                    <p className={'e'} >e</p>
                    <p className={'f'} >f</p>
                </div>
            </div>
            <button className={'carouselPrev'} onClick={prev}>prev</button>
            <button className={'carouselNext'} onClick={next}>next</button>
            <BGMButton audio={new Audio(require('../../../../resources/sound/artGalley/Buttercup.mp3'))} />
        </div>
    )
}

export default Carousel;