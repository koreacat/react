import React, {useEffect, useState} from 'react';
import './HamderTale.scss';

const HamderTale = () => {

    return (
        <div className={'hamderTale'}>
            <iframe width="100" height="100" 
                    src="https://www.youtube.com/embed/H0YDbhBNJfY?amp;autoplay=1&amp;playlist=lDZnM3Uuq0E&amp;loop=1" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    style={{position: 'absolute', right: 0, zIndex: 2}} />
            <div className={'hamderTaleWrap'}>
                <div className={'hamderTaleCharacterWrap'}>
                    <div className={'hamderTaleCharacter'}></div>
                    <div className={'hamderTaleScript'}>멍멍멍멍? 왈왈! 으르렁... 컹컹컹컹? 낑낑.</div>
                </div>
                <div className={'hamderTaleHeartBox'}>
                    <div className={'hamderTaleHeart'} />
                </div>
                <div className={'hamderTaleStatusbar'}>
                    <span className={'hamderTaleStatusbarName'}>HAM</span>
                    <span className={'hamderTaleStatusbarLevel'}>LV 25</span>
                    <span className={'hamderTaleHP'}>HP</span>
                    <span className={'hamderTaleHPBar'}></span>
                    <span className={'hamderTaleKR'}>KR</span>
                    <span className={'hamderTaleStatusbarHP'}>92 / 92</span>
                </div>
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
}

export default HamderTale;