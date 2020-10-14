import React, {useState} from 'react';
import './HamTaker.scss';

window.addEventListener('keydown', function () {
    // @ts-ignore
    document.getElementById('ham').focus();
});

enum MapData {
    space,
    land,
    rock,
    thorn,
    goal,
    spikeTrapOnOff,
    skeleton,
}

const HamTaker = () => {
    const distance = 50;
    let [clear, setClear] = useState(false);
    let [coordinates, setCoordinates] = useState({x: 0, y: 0});
    let [life, setLife] = useState(10);
    let [spike, setSpike] = useState(false);
    let [failHeight, setFailHeight] = useState('0');
    let [failOpacity, setFailOpacity] = useState('0');
    let [controllable, setControllable] = useState(true);
    let [data, setData] = useState([
        [1],
        [1, 1, 1, 1, 2, 1],
        [0, 1, 0, 3, 1],
        [1, 1, 1, 1, 5, 1],
        [1, 2, 1, 6, 6, 6],
        [1, 0, 5, 1, 1, 4]
    ]);

    const keyDown = (e: any) => {
        if (!controllable) return;
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
    };

    const reset = () => {
        setControllable(false);
        failAnimation();
        setTimeout(function () {
            setLife(10);
            setCoordinates({x: 0, y: 0});
            setClear(false);
        }, 350);

        setTimeout(function () {
            setControllable(true);
        }, 2500);
    };

    const failAnimation = () => {
        setFailHeight('50%');

        setTimeout(function () {
            setFailOpacity('100');
        }, 350);

        setTimeout(function () {
            setFailOpacity('0');
        }, 1600);

        setTimeout(function () {
            setFailHeight('0');
        }, 1900);
    };

    const movable = (data: number[][], y: number, x: number) => {
        if (life - 1 < 0 || clear) {
            reset();
            return;
        }
        switch (data[y][x]) {
            case MapData.land:
                setSpike(!spike);
                setLife(life - 1);
                return true;
            case MapData.thorn:
                setSpike(!spike);
                if (life - 2 < 0) {reset(); return;}
                setLife(life - 2);
                return true;
            case MapData.goal:
                setSpike(!spike);
                setLife(life - 1);
                setClear(true);
                return true;
            case MapData.skeleton:
                return false;
            case MapData.spikeTrapOnOff:
                setSpike(!spike);
                if (!spike && (life - 2 < 0)) {reset(); return;}
                setLife(life - (spike ? 1 : 2));
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
        height: failHeight
    };

    const failStyleCenter = {
        opacity: failOpacity
    };

    return (
        <div className={'hamTaker'}>
            <iframe width="100" height=" 100"
                    src="https://www.youtube.com/embed/TzJW3OUSxKs?amp;autoplay=1&amp;playlist=lDZnM3Uuq0E&amp;loop=1"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    style={{position: 'absolute', right: 0, zIndex: 999}} />
            <div className={'hamTakerWrap'}>
                <div className={'map'}>
                    <div id={'ham'} className={'ham'} tabIndex={0} onKeyDown={keyDown} style={hamTakerStyle}><p /></div>
                    {
                        data.map((line, x) => {
                            return (
                                <div key={x} className={'mapTile'}>
                                    {
                                        line.map((point, y) => {
                                            return (
                                                <p key={x + '' + y}
                                                   className={
                                                       (point === MapData.spikeTrapOnOff) ? (spike ? 'spikeTrapOn' : 'spikeTrapOff') : MapData[point]
                                                   }
                                                   style={{width: distance, height: distance}}
                                                />
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
                    <div className={'hamTakerSuccessLeft'} />
                    <div className={'hamTakerSuccessRight'} />
                    <div className={'hamTakerSuccessSentence'}>
                        <h3>GLORIOUS</h3>
                        <h2>SUCCESS</h2>
                    </div>
                </div>
                <div className={'hamTakerFail'}>
                    <div className={'hamTakerFailUp'} style={failStyle} />
                    <div className={'hamTakerFailDown'} style={failStyle} />
                    <div className={'hamTakerFailCenter'} style={failStyleCenter}>
                        <h2>HAMTAKER</h2>
                    </div>
                </div>
            </div>
            <div className={'characterWrap'}>
                <p className={'루시퍼'}/>
                <p className={'말리나'}/>
                <p className={'모데우스'}/>
                <p className={'아자젤'}/>
                <p className={'저스티스'}/>
                <p className={'저지먼트'}/>
                <p className={'즈드라다'}/>
                <p className={'판데모니카'}/>
                <p className={'케르베로스'}/>
                <p className={'케르베로스'}/>
                <p className={'케르베로스'}/>
            </div>
        </div>
    )
};

export default HamTaker;