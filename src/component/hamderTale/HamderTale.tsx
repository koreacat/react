import React, {useEffect, useState} from 'react';
import './HamderTale.scss';

const HamderTale = () => {
    const [heartTop, setHeartTop] = useState(69);
    const [heartLeft, setHeartLeft] = useState(69);
    let top = 69;
    let left = 69;
    let keypress : any = {};

    useEffect(() => {
        const interval = setInterval(() => {
            if(top > 0 && keypress['ArrowUp']) top--;
            if(top < 139 && keypress['ArrowDown']) top++;
            if(left > 0 && keypress['ArrowLeft']) left--;
            if(left < 139 && keypress['ArrowRight']) left++;
            setHeartTop(top);
            setHeartLeft(left);
        }, 10);
        return () => {
            clearInterval(interval);
        }
    }, []);

    useEffect(() => {
        window.addEventListener('keydown', (e) => {
            keypress[e.key] = true;
        });
        return () => {
            window.removeEventListener('keydown', (e) => {
                keypress[e.key] = true;
            });
        }
    });

    useEffect(() => {
        window.addEventListener('keyup', (e) => {
            keypress[e.key] = false;
        });
        return () => {
            window.removeEventListener('keyup', (e) => {
                keypress[e.key] = false;
            });
        }
    });

    const heartStyle = {
        top: heartTop,
        left: heartLeft
    };

    return (
        <div className={'hamderTale'}>
            <iframe width="100" height="100"
                    src="https://www.youtube.com/embed/H0YDbhBNJfY?amp;autoplay=1&amp;playlist=lDZnM3Uuq0E&amp;loop=1"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    style={{position: 'absolute', right: 0, zIndex: 2}} />
            <div className={'hamderTaleWrap'}>
                <div className={'hamderTaleCharacterWrap'}>
                    <div className={'hamderTaleCharacter'} />
                    <div className={'hamderTaleScript'}>멍멍멍멍? 왈왈! 으르렁... 컹컹컹컹? 낑낑.</div>
                </div>
                <div className={'hamderTaleHeartBox'}>
                    <div className={'hamderTaleHeart'} style={heartStyle} />
                </div>
                <p className={'hamderTaleStatusbar'}>
                    <span className={'hamderTaleStatusbarName'}>HAM</span>
                    <span className={'hamderTaleStatusbarLevel'}>LV 25</span>
                    <span className={'hamderTaleHP'}>HP</span>
                    <span className={'hamderTaleHPBar'} />
                    <span className={'hamderTaleKR'}>KR</span>
                    <span className={'hamderTaleStatusbarHP'}>92 / 92</span>
                </p>
                <div className={'hamderTaleMenuWrap'}>
                    <ul>
                        <li><p className={'hamderTaleAttack'}/><span>공격</span></li>
                        <li><p className={'hamderTaleaAction'}/><span>행동</span></li>
                        <li><p className={'hamderTaleItem'}/><span>아이템</span></li>
                        <li><p className={'hamderTaleMercy'}/><span>자비</span></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default HamderTale;