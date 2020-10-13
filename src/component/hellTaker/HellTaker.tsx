import React, {useState} from 'react';
import './HellTaker.scss';

window.addEventListener('keydown', function () {
    // @ts-ignore
    document.getElementById('hellTaker').focus();
});

enum MapData {
    space,
    land,
    rock,
    thorn,
    goal,
}

const HellTaker = () => {
    const distance = 50;
    let [coordinates, setCoordinates] = useState({x: 0, y: 0});
    let [life, setLife] = useState(10);
    let [data, setData] = useState([
        [1],
        [1, 1, 1, 1, 1, 1],
        [0, 1, 0, 3, 1],
        [1, 1, 1, 1, 1, 1],
        [1, 2, 1],
        [1, 0, 1, 1, 1, 4]
    ]);

    const keyDown = (e: any) => {
        switch (e.key) {
            case 'ArrowUp':
                if (!data[coordinates.y - 1] || !movable(data, coordinates.y - 1, coordinates.x)) return;
                setCoordinates({x: coordinates.x, y: coordinates.y - 1});
                setLife(life-1);
                break;
            case 'ArrowDown':
                if (!data[coordinates.y + 1] || !movable(data, coordinates.y + 1, coordinates.x)) return;
                setCoordinates({x: coordinates.x, y: coordinates.y + 1});
                setLife(life-1);
                break;
            case 'ArrowLeft':
                if (!data[coordinates.x - 1] || !movable(data, coordinates.y, coordinates.x - 1)) return;
                setCoordinates({x: coordinates.x - 1, y: coordinates.y});
                setLife(life-1);
                break;
            case 'ArrowRight':
                if (!data[coordinates.x + 1] || !movable(data, coordinates.y, coordinates.x + 1)) return;
                setCoordinates({x: coordinates.x + 1, y: coordinates.y});
                setLife(life-1);
                break;
        }
        life <= 0 && reset();
    };

    const reset = () => {
        setLife(10);
        setCoordinates({x:0, y:0});
        alert('Hell Taker!');
    };

    const movable = (data: number[][], y: number, x: number) => {
        switch (data[y][x]) {
            case MapData.land:
                return true;
            case MapData.thorn:
                life--;
                return true;
            case MapData.goal:
                alert('done');
                return true;
            default:
                return false;
        }
    };

    const style = {
        width: distance,
        height: distance,
        transform: `translate(${coordinates.x * distance}px, ${coordinates.y * distance}px)`,
    };

    return (
        <div className={'hellTaker'}>
            <div className={'hellTakerWrap'}>
                <div className={'map'}>
                    <div id={'hellTaker'} className={'hellTaker'} tabIndex={0} onKeyDown={keyDown} style={style}/>
                    {
                        data.map((line, x) => {
                            return (
                                <div key={x}>
                                    {
                                        line.map((point, y) => {
                                            return (
                                                <p key={x + '' + y} className={MapData[point]}
                                                   style={{width: distance, height: distance}}/>
                                            )
                                        })
                                    }
                                </div>
                            )
                        })
                    }
                    <h2 className={'life'}>{life}</h2>
                </div>
            </div>
        </div>
    )
};

export default HellTaker;