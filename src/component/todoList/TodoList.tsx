import React from 'react';
import './TodoList.scss';


const TodoList = () => {

    const allowDrop = (e: any) => {
        e.preventDefault();
    };

    const drag = (dataTransfer: any, target: any) => {
        dataTransfer.setData('text', target.id);
    };

    const drop = (e: any) => {
        e.preventDefault();
        if(!e.target.className.includes('droppable')){
            return;
        }

        let data = e.dataTransfer.getData('text');
        e.target.appendChild(document.getElementById(data));
    };

    return (
        <div className={'todoList'}>
            <div className={'todoListWrap'}>
                <div className={'droppable a'} onDrop={drop} onDragOver={allowDrop}>
                    <p id={'a'} draggable={'true'} onDragStart={(e) => drag(e.dataTransfer, e.target)}>a</p>
                    <p id={'b'} draggable={'true'} onDragStart={(e) => drag(e.dataTransfer, e.target)}>b</p>
                    <p id={'c'} draggable={'true'} onDragStart={(e) => drag(e.dataTransfer, e.target)}>c</p>
                    <p id={'d'} draggable={'true'} onDragStart={(e) => drag(e.dataTransfer, e.target)}>d</p>
                    <p id={'e'} draggable={'true'} onDragStart={(e) => drag(e.dataTransfer, e.target)}>e</p>
                    <p id={'f'} draggable={'true'} onDragStart={(e) => drag(e.dataTransfer, e.target)}>f</p>

                </div>
                <div className={'droppable b'} onDrop={drop} onDragOver={allowDrop}>

                </div>
            </div>
        </div>
    )
};

export default TodoList;