import React, {useEffect, useState} from 'react';
import './HamderTale.scss';

const HamderTale = () => {
    const speed = 1.5;
    const maxHP = 100;
    let top = 69, left = 69;
    let keypress : any = {};

    const [sansScript, setSansScript] = useState('');
    const [heartTop, setHeartTop] = useState(top);
    const [heartLeft, setHeartLeft] = useState(left);
    const [heartHP, setHeartHP] = useState(maxHP);
    const [gasterTopAnimation, setGasterTopAnimation] = useState('');
    const [gasterBottomAnimation, setGasterBottomAnimation] = useState('');
    const [gasterLeftAnimation, setGasterLeftAnimation] = useState('');
    const [gasterRightAnimation, setGasterRightAnimation] = useState('');

    const [gasterBlasterTopAnimation, setGasterBlasterTopAnimation] = useState('');
    const [gasterBlasterBottomAnimation, setGasterBlasterBottomAnimation] = useState('');
    const [gasterBlasterLeftAnimation, setGasterBlasterLeftAnimation] = useState('');
    const [gasterBlasterRightAnimation, setGasterBlasterRightAnimation] = useState('');

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
		window.addEventListener('keyup', (e) => {
			keypress[e.key] = false;
		});
        return () => {
            window.removeEventListener('keydown', (e) => {
                keypress[e.key] = true;
            });
			window.removeEventListener('keyup', (e) => {
				keypress[e.key] = false;
			});
        }
    });


    //scenario
    useEffect(() => {
        let hp = heartHP;

        /*------------------------------------------------------------
        ------------------------ SansScript 00 -----------------------
        ------------------------------------------------------------*/
		const sans = '그냥 본론으로 들어가자구.';
		let scriptIndex = 1;
        const timeout00 = setTimeout(() => {
            const interval = setInterval(() => {
                if(sans != sans.substring(0, scriptIndex)){
                    let sansSound = new Audio(require('../../resources/sound/hamderTale/sans.wav'));
                    sansSound.play();
                }
                setSansScript(sans.substring(0, scriptIndex++));
            }, 100);

            setTimeout(() => {
                clearInterval(interval);
            }, 3500);
        }, 3500);


        /*------------------------------------------------------------
        ----------------- Pattern 01 - Gaster Blaster ----------------
        ------------------------------------------------------------*/
        const timeout01 = setTimeout(() => {
            setGasterBlasterAnimation01();
        }, 6500);

        setTimeout(() => {
            setGasterAnimation01();
            const interval = setInterval(() => {
                if(hp <= 0) return;
                if(top<50 || top>90 || left<50 || left>90){
                    let hurtSound = new Audio(require('../../resources/sound/hamderTale/hurt.wav'));
                    hurtSound.play();
                    hp--;
                }
                setHeartHP(hp);
            }, 20);

            setTimeout(() => {
                clearInterval(interval);
            }, 1000);
        }, 7500);

        setTimeout(() => {
            resetGasterAnimation01();
        }, 8500);


        /*------------------------------------------------------------
        ----------------- Pattern 02 - Gaster Blaster ----------------
        ------------------------------------------------------------*/





        /*------------------------------------------------------------
        ----------------- Pattern 03 - Gaster Blaster ----------------
        ------------------------------------------------------------*/
        const timeout02 = setTimeout(() => {
            setGasterBlasterAnimation01();
        }, 9000);

        setTimeout(() => {
            setGasterAnimation01();
            const interval = setInterval(() => {
                if(hp <= 0) return;
                if(top<50 || top>90 || left<50 || left>90){
                    let hurtSound = new Audio(require('../../resources/sound/hamderTale/hurt.wav'));
                    hurtSound.play();
                    hp--;
                }
                setHeartHP(hp);
            }, 20);

            setTimeout(() => {
                clearInterval(interval);
            }, 1000);
        }, 10000);

        setTimeout(() => {
            resetGasterAnimation01();
        }, 11000);


        return (() => {
            clearTimeout(timeout00);
            clearTimeout(timeout01);
            clearTimeout(timeout02);
        });
    }, [top, left]);

    const setGasterBlasterAnimation01 = () => {
        let gasterBlasterSound = new Audio(require('../../resources/sound/hamderTale/gasterBlaster.mp3'));
        gasterBlasterSound.play();
        setGasterBlasterTopAnimation('gasterBlasterTop 3s ease-in-out');
        setGasterBlasterBottomAnimation('gasterBlasterBottom 3s ease-in-out');
        setGasterBlasterLeftAnimation('gasterBlasterLeft 3s ease-in-out');
        setGasterBlasterRightAnimation('gasterBlasterRight 3s ease-in-out');
    };

    const setGasterAnimation01 = () => {
        setGasterTopAnimation('gasterTop 1s ease-in-out');
        setGasterBottomAnimation('gasterBottom 1s ease-in-out');
        setGasterLeftAnimation('gasterLeft 1s ease-in-out');
        setGasterRightAnimation('gasterRight 1s ease-in-out');
    };

    const resetGasterAnimation01 = () => {
        setGasterBlasterTopAnimation('');
        setGasterBlasterBottomAnimation('');
        setGasterBlasterLeftAnimation('');
        setGasterBlasterRightAnimation('');
        setGasterTopAnimation('');
        setGasterBottomAnimation('');
        setGasterLeftAnimation('');
        setGasterRightAnimation('');
    };

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
                src="https://www.youtube.com/embed/H0YDbhBNJfY?amp;autoplay=1&amp;"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                style={{position: 'absolute', right: 0, zIndex: 2}}
                />
            <div className={'hamderTaleWrap'}>
                <div className={'hamderTaleCharacterWrap'}>
                    <div className={'hamderTaleCharacter'} />
                    <div className={'hamderTaleScript'}>{sansScript}</div>
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
                    <span className={'hamderTaleHPBarWrap'}>
                        <span className={'hamderTaleMaxHPBar'} />
                        <span className={'hamderTaleHPBar'} style={{width:heartHP}} />
                    </span>
                    <span className={'hamderTaleKR'}>KR</span>
                    <span className={'hamderTaleStatusbarHP'}>{heartHP} / {maxHP}</span>
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
