import React, {useState} from 'react';
import './HamTaker.scss';

window.addEventListener('keydown', function () {
    // @ts-ignore
    document.getElementById('hamTaker').focus();
});

enum MapData {
    space,
    land,
    rock,
    thorn,
    goal,
}

const HamTaker = () => {
    const distance = 50;
    let [clear, setClear] = useState(false);
    let [coordinates, setCoordinates] = useState({x: 0, y: 0});
    let [life, setLife] = useState(10);
    let [failOpacity, setFailOpacity] = useState(0);
    let [data, setData] = useState([
        [1],
        [1, 1, 1, 1, 1, 1],
        [0, 1, 0, 3, 1],
        [1, 1, 1, 1, 1, 1],
        [1, 2, 1],
        [1, 0, 1, 1, 1, 4]
    ]);

    const keyDown = (e: any) => {
        clear && reset();

        switch (e.key) {
            case 'ArrowUp':
                if (!data[coordinates.y - 1] || !movable(data, coordinates.y - 1, coordinates.x)) return;
                setCoordinates({x: coordinates.x, y: coordinates.y - 1});
                break;
            case 'ArrowDown':
                if (!data[coordinates.y + 1] || !movable(data, coordinates.y + 1, coordinates.x)) return;
                setCoordinates({x: coordinates.x, y: coordinates.y + 1});
                break;
            case 'ArrowLeft':
                if (!data[coordinates.x - 1] || !movable(data, coordinates.y, coordinates.x - 1)) return;
                setCoordinates({x: coordinates.x - 1, y: coordinates.y});
                break;
            case 'ArrowRight':
                if (!data[coordinates.x + 1] || !movable(data, coordinates.y, coordinates.x + 1)) return;
                setCoordinates({x: coordinates.x + 1, y: coordinates.y});
                break;
        }
        setLife(life-1);
        life <= 0 && reset();
    };

    const reset = () => {
        setFailOpacity(100);
        setTimeout(function () {
            setFailOpacity(0);
        }, 1000);

        setLife(10);
        setCoordinates({x:0, y:0});
        setClear(false);
    };

    const movable = (data: number[][], y: number, x: number) => {
        switch (data[y][x]) {
            case MapData.land:
                return true;
            case MapData.thorn:
                life--;
                return true;
            case MapData.goal:
                setClear(true);
                return true;
            default:
                return false;
        }
    };

    const hamTakerStyle = {
        width: distance,
        height: distance,
        transform: `translate(${coordinates.x * distance}px, ${coordinates.y * distance}px)`,
    };

    const failStyle = {
        opacity: failOpacity
    };

    return (
        <div className={'hamTaker'}>
            <div className={'hamTakerWrap'}>
                <div className={'map'}>
                    <div id={'hamTaker'} className={'hamTaker'} tabIndex={0} onKeyDown={keyDown} style={hamTakerStyle}/>
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
                <div className={'hamTakerSuccess'} style={{display: clear ? 'block' : 'none'}}>
                    <div className={'hamTakerSuccessLeft'}></div>
                    <div className={'hamTakerSuccessRight'}></div>
                    <div className={'hamTakerSuccessSentence'}>
                        <h3>GLORIOUS</h3>
                        <h2>SUCCESS</h2>
                    </div>
                </div>
                <div className={'hamTakerFail'} style={failStyle}>
                    <h2>HAMTAKER</h2>
                </div>
            </div>
        </div>
    )
};

export default HamTaker;