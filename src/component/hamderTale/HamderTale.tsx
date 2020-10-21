import React, {useEffect, useState} from 'react';
import './HamderTale.scss';

const HamderTale = () => {
    const [heartTop, setHeartTop] = useState(69);
    const [heartLeft, setHeartLeft] = useState(69);
    const [gasterTopAnimation, setGasterTopAnimation] = useState('');
    const [gasterBottomAnimation, setGasterBottomAnimation] = useState('');
    const [gasterLeftAnimation, setGasterLeftAnimation] = useState('');
    const [gasterRightAnimation, setGasterRightAnimation] = useState('');

    const [gasterBlasterTopAnimation, setGasterBlasterTopAnimation] = useState('');
    const [gasterBlasterBottomAnimation, setGasterBlasterBottomAnimation] = useState('');
    const [gasterBlasterLeftAnimation, setGasterBlasterLeftAnimation] = useState('');
    const [gasterBlasterRightAnimation, setGasterBlasterRightAnimation] = useState('');
    const [controllable, setControllable] = useState(true);

    const speed = 1.5;
    let top = 69;
    let left = 69;
    let keypress : any = {};

    useEffect(() => {
        const interval = setInterval(() => {
            if(top > 0 && keypress['ArrowUp']) top-=speed;
            if(top < 139 && keypress['ArrowDown']) top+=speed;
            if(left > 0 && keypress['ArrowLeft']) left-=speed;
            if(left < 139 && keypress['ArrowRight']) left+=speed;
            setHeartTop(top);
            setHeartLeft(left);
        }, 10);
        return () => {
            clearInterval(interval);
        }
    }, [top, left]);

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

    const onClick = () => {
        let audio = new Audio(require('./sound/bark.mp3'));
        audio.play();

        if(!controllable) return;
        setControllable(false);
        setGasterBlasterTopAnimation('');
        setGasterBlasterBottomAnimation('');
        setGasterBlasterLeftAnimation('');
        setGasterBlasterRightAnimation('');
        setGasterTopAnimation('');
        setGasterBottomAnimation('');
        setGasterLeftAnimation('');
        setGasterRightAnimation('');

        //TODO 1초동안 interval 돌려서 하트 위치가 히트존에 있으면 hp-- 

        setTimeout(() => {
            setGasterBlasterTopAnimation('gasterBlasterTop 4s ease-in-out');
            setGasterBlasterBottomAnimation('gasterBlasterBottom 4s ease-in-out');
            setGasterBlasterLeftAnimation('gasterBlasterLeft 4s ease-in-out');
            setGasterBlasterRightAnimation('gasterBlasterRight 4s ease-in-out');
        }, 500);

        setTimeout(() => {
            setGasterTopAnimation('gasterTop 1s ease-in-out');
            setGasterBottomAnimation('gasterBottom 1s ease-in-out');
            setGasterLeftAnimation('gasterLeft 1s ease-in-out');
            setGasterRightAnimation('gasterRight 1s ease-in-out');
        }, 2100);

        setTimeout(() => {
            setControllable(true);
        }, 3000)
    }

    const heartStyle = {
        top: heartTop,
        left: heartLeft
    };

    const gasterTopStyle = {
        animation: gasterTopAnimation
    };

    const gasterBottomStyle = {
        animation: gasterBottomAnimation
    };

    const gasterLeftStyle = {
        animation: gasterLeftAnimation
    };

    const gasterRightStyle = {
        animation: gasterRightAnimation
    };

    const gasterBlasterTopStyle = {
        animation: gasterBlasterTopAnimation
    };

    const gasterBlasterBottomStyle = {
        animation: gasterBlasterBottomAnimation
    };

    const gasterBlasterLeftStyle = {
        animation: gasterBlasterLeftAnimation
    };

    const gasterBlasterRightStyle = {
        animation: gasterBlasterRightAnimation
    };

    return (
        <div className={'hamderTale'}>
            <iframe width="100" height="100"
                    src="https://www.youtube.com/embed/H0YDbhBNJfY?amp;autoplay=1&amp;playlist=lDZnM3Uuq0E&amp;loop=1"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    style={{position: 'absolute', right: 0, zIndex: 2}} />
            <div className={'hamderTaleWrap'}>
                <div className={'hamderTaleCharacterWrap'}>
                    <div className={'hamderTaleCharacter'} onClick={onClick} />
                    <div className={'hamderTaleScript'}>멍멍멍멍? 왈왈! 으르렁... 컹컹컹컹? 낑낑...</div>
                </div>
                <div className={'hamderTaleHeartBox'}>
                    <div className={'hamderTaleHeart'} style={heartStyle} />
                    <div className={'hamderTalePattern01'}>
                        <div className={'gaster gasterTop'} style={gasterTopStyle} />
                        <div className={'gaster gasterBottom'} style={gasterBottomStyle} />
                        <div className={'gaster gasterLeft'} style={gasterLeftStyle} />
                        <div className={'gaster gasterRight'} style={gasterRightStyle} />
                        <div className={'gasterBlaster gasterBlasterTop'} style={gasterBlasterTopStyle} />
                        <div className={'gasterBlaster gasterBlasterBottom'} style={gasterBlasterBottomStyle} />
                        <div className={'gasterBlaster gasterBlasterLeft'} style={gasterBlasterLeftStyle} />
                        <div className={'gasterBlaster gasterBlasterRight'} style={gasterBlasterRightStyle} />
                    </div>
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