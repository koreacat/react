import React from 'react';
import './AppMenu.scss';
import Clock from '../clock/Clock';
import TodoList from '../todoList/TodoList';

const AppIcon = ({title, onClick}:any) => {

    return(
        <div className={'appIcon'} onClick={onClick}>
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

    return(
        <div className={'appMenu'}>
            <AppIcon title={'clock'} onClick={clockClick}/>
            <AppIcon title={'todoList'} onClick={todoListClick}/>
        </div>
    );
};

export default AppMenu;