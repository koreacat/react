import React from 'react';
import './AppMenu.scss';
import Clock from '../clock/Clock';
import TodoList from '../todoList/TodoList';
import HamTaker from '../hamTaker/HamTaker';
import HamderTale from '../hamderTale/HamderTale';

const AppIcon = ({title, img, onClick}:any) => {
    const style = {
        backgroundImage: `url(${require(img+'')})`
    };
    return(
        <div className={'appIcon'} onClick={onClick} style={style}>
            <span className={'appIconName'}>{title}</span>
        </div>
    )
};

const AppMenu = ({setAppState}: any) => {
    return(
        <div className={'appMenu'}>
            <AppIcon title={'clock'} img={'./img/default_icon.png'} onClick={() => {setAppState(<Clock />)}}/>
            <AppIcon title={'hamTaker'} img={'./img/hamTaker_icon.jpg'} onClick={() => {setAppState(<HamTaker />)}}/>
            <AppIcon title={'hamderTale'} img={'./img/hamderTale_icon.png'} onClick={() => {setAppState(<HamderTale />)}}/>
            <AppIcon title={'todoList'} img={'./img/default_icon.png'} onClick={() => {setAppState(<TodoList />)}}/>
        </div>
    );
};

export default AppMenu;