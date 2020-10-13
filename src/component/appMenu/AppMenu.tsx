import React from 'react';
import './AppMenu.scss';
import Clock from '../clock/Clock';
import TodoList from '../todoList/TodoList';
import HamTaker from '../hamTaker/HamTaker';

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
    const clockClick = () => {
        setAppState(<Clock />);
    };

    const todoListClick = () => {
        setAppState(<TodoList />);
    };

    const hamTakerClick = () => {
        setAppState(<HamTaker />);
    };

    return(
        <div className={'appMenu'}>
            <AppIcon title={'clock'} img={'./img/default_icon.png'} onClick={clockClick}/>
            <AppIcon title={'todoList'} img={'./img/default_icon.png'} onClick={todoListClick}/>
            <AppIcon title={'hamTaker'} img={'./img/hamTaker_icon.jpg'} onClick={hamTakerClick}/>
        </div>
    );
};

export default AppMenu;