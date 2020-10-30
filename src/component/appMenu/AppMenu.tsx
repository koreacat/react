import React, {useEffect, useRef} from 'react';
import './AppMenu.scss';
import Clock from '../clock/Clock';
import HamderTale from '../hamderTale/HamderTale';
import HamKemon from '../hamKemon/HamKemon';
import HampleStory from '../hampleStory/HampleStory';
import HamTaker from '../hamTaker/HamTaker';
import Canvas from '../canvas/App';

const AppIcon = ({title, img, onClick}: any) => {
    const style = {
        backgroundImage: `url(${require(img + '')})`
    };
    return (
        <div className={'appIcon'} onClick={onClick} style={style}>
            <span className={'appIconName'}>{title}</span>
        </div>
    )
};

const AppMenu = ({setAppState}: any) => {
    const appMenu: any = useRef(null);

    const scrollEvent = (e: any) => {
        let diff = e.deltaY;
        window.requestAnimationFrame(() => {
            appMenu.current.scrollLeft += diff;
        });
    };

    return (
        <div ref={appMenu} className={'appMenu'} onWheel={scrollEvent}>
            <AppIcon title={'clock'} img={'./img/clock_icon.jpg'} onClick={() => {setAppState(<Clock/>)}}/>
            <AppIcon title={'hamderTale'} img={'./img/hamderTale_icon.png'} onClick={() => {setAppState(<HamderTale/>)}}/>
            <AppIcon title={'hamKemon'} img={'./img/hamKemon_icon.png'} onClick={() => {setAppState(<HamKemon/>)}}/>
            <AppIcon title={'hampleStory'} img={'./img/hampleStory_icon.png'} onClick={() => {setAppState(<HampleStory/>)}}/>
            <AppIcon title={'hamTaker'} img={'./img/hamTaker_icon.jpg'} onClick={() => {setAppState(<HamTaker/>)}}/>
            <AppIcon title={'canvas'} img={'./img/canvas_icon.png'} onClick={() => {setAppState(<Canvas/>)}}/>
            <AppIcon title={'drive'} img={'./img/default_icon.png'} onClick={() => {}}/>
            <AppIcon title={'parrot'} img={'./img/default_icon.png'} onClick={() => {}}/>
            <AppIcon title={'cube'} img={'./img/default_icon.png'} onClick={() => {}}/>
            <AppIcon title={'artGalley'} img={'./img/default_icon.png'} onClick={() => {}}/>

            <AppIcon title={'dummy'} img={'./img/default_icon.png'} onClick={() => {}}/>
            <AppIcon title={'dummy'} img={'./img/default_icon.png'} onClick={() => {}}/>
            <AppIcon title={'dummy'} img={'./img/default_icon.png'} onClick={() => {}}/>
            <AppIcon title={'dummy'} img={'./img/default_icon.png'} onClick={() => {}}/>
            <AppIcon title={'dummy'} img={'./img/default_icon.png'} onClick={() => {}}/>
            <AppIcon title={'dummy'} img={'./img/default_icon.png'} onClick={() => {}}/>
            <AppIcon title={'dummy'} img={'./img/default_icon.png'} onClick={() => {}}/>
            <AppIcon title={'dummy'} img={'./img/default_icon.png'} onClick={() => {}}/>
            <AppIcon title={'dummy'} img={'./img/default_icon.png'} onClick={() => {}}/>
            <AppIcon title={'dummy'} img={'./img/default_icon.png'} onClick={() => {}}/>
            <AppIcon title={'dummy'} img={'./img/default_icon.png'} onClick={() => {}}/>
            <AppIcon title={'dummy'} img={'./img/default_icon.png'} onClick={() => {}}/>
            <AppIcon title={'dummy'} img={'./img/default_icon.png'} onClick={() => {}}/>
            <AppIcon title={'dummy'} img={'./img/default_icon.png'} onClick={() => {}}/>
            <AppIcon title={'dummy'} img={'./img/default_icon.png'} onClick={() => {}}/>
            <AppIcon title={'dummy'} img={'./img/default_icon.png'} onClick={() => {}}/>
            <AppIcon title={'dummy'} img={'./img/default_icon.png'} onClick={() => {}}/>
            <AppIcon title={'dummy'} img={'./img/default_icon.png'} onClick={() => {}}/>
            <AppIcon title={'dummy'} img={'./img/default_icon.png'} onClick={() => {}}/>
            <AppIcon title={'dummy'} img={'./img/default_icon.png'} onClick={() => {}}/>
            <AppIcon title={'dummy'} img={'./img/default_icon.png'} onClick={() => {}}/>
            <AppIcon title={'dummy'} img={'./img/default_icon.png'} onClick={() => {}}/>
            <AppIcon title={'dummy'} img={'./img/default_icon.png'} onClick={() => {}}/>
            <AppIcon title={'dummy'} img={'./img/default_icon.png'} onClick={() => {}}/>
        </div>
    );
};

export default AppMenu;