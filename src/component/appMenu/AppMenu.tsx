import React from 'react';
import './AppMenu.scss';
import Clock from '../clock/Clock';
import TodoList from '../todoList/TodoList';
import HellTaker from "../hellTaker/HellTaker";

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

    const hellTakerClick = () => {
      setAppState(<HellTaker />);
    };

    return(
        <div className={'appMenu'}>
            <AppIcon title={'clock'} img={'./img/default_icon.png'} onClick={clockClick}/>
            <AppIcon title={'todoList'} img={'./img/default_icon.png'} onClick={todoListClick}/>
            <AppIcon title={'hellTaker'} img={'./img/hellTaker_icon.jpg'} onClick={hellTakerClick}/>
        </div>
    );
};

export default AppMenu;