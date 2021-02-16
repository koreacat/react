import React, {useRef} from 'react';
import './AppMenu.scss';
import Clock from '../clock/Clock';
import HamderTale from '../hamderTale/HamderTale';
import HamTaker from '../hamTaker/HamTaker';
import Canvas from '../canvas/App';
import ArtGalley from "../artGalley/ArtGalley";
import Profile from "../profile/Profile";
import HamkestDungeon from "../hamkestDungeon/HamkestDungeon";
import Matterjs from "../matterjs/Matterjs";

const AppIcon = ({title, img, onClick}: any) => {
    const style = {
        backgroundImage: `url(${require('./icon/'+img)})`,
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
            <AppIcon title={'profile'} img={'default_icon.png'} onClick={() => {setAppState(<Profile/>)}}/>
			<AppIcon title={'matterjs'} img={'default_icon.png'} onClick={() => {setAppState(<Matterjs/>)}}/>
			<AppIcon title={'hamkest Dungeon'} img={'hamkestDungeon_icon.jpg'} onClick={() => {setAppState(<HamkestDungeon/>)}}/>
            <AppIcon title={'hamTaker'} img={'hamTaker_icon.jpg'} onClick={() => {setAppState(<HamTaker/>)}}/>
            <AppIcon title={'hamderTale'} img={'hamderTale_icon.png'} onClick={() => {setAppState(<HamderTale/>)}}/>
			<AppIcon title={'artGalley'} img={'artGalley_icon.jpg'} onClick={() => {setAppState(<ArtGalley/>)}}/>
			<AppIcon title={'clocks'} img={'clock_icon.jpg'} onClick={() => {setAppState(<Clock/>)}}/>
			<AppIcon title={'canvas'} img={'canvas_icon.png'} onClick={() => {setAppState(<Canvas/>)}}/>
		</div>
    );
};

export default AppMenu;
