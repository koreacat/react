import React, {useState, useEffect} from 'react';
import './Clock.scss';
import DateFormat from '../../common/DateFormat';
import {clockProps, clockList} from './type';


const KoreanClock = (({date}: clockProps) => {
	const HH = parseInt(DateFormat(date, 'HH'));
	const hh = parseInt(DateFormat(date, 'hh'));
	const mm = parseInt(DateFormat(date, 'mm'));

    return (
        <div className={'koreanClock'}>
            <div className={'koreanClockWrap'}>
                <table>
                    <tbody>
                    <tr>
                        <td className={HH >= 9 && HH < 21 ? 'on' : ''}>낮</td>
                        <td className={hh === 5 ? 'on' : ''}>다</td>
                        <td className={hh === 7 ? 'on' : ''}>일</td>
                        <td className={hh === 3 ? 'on' : ''}>세</td>
                        <td className={hh === 4 ? 'on' : ''}>네</td>
                    </tr>
                    <tr>
                        <td className={hh === 6 || hh === 8 ? 'on' : ''}>여</td>
                        <td className={hh === 5 || hh === 6 ? 'on' : ''}>섯</td>
                        <td className={hh === 7 ? 'on' : ''}>곱</td>
                        <td className={hh >= 10 ? 'on' : ''}>열</td>
                        <td className={hh === 1 || hh === 11 ? 'on' : ''}>한</td>
                    </tr>
                    <tr>
                        <td className={hh === 8 ? 'on' : ''}>덟</td>
                        <td className={hh === 9 ? 'on' : ''}>아</td>
                        <td className={hh === 9 ? 'on' : ''}>홉</td>
                        <td className={hh === 2 || hh === 12 ? 'on' : ''}>두</td>
                        <td className={'on'}>시</td>
                    </tr>
                    <tr>
                        <td className={HH >= 21 || HH < 9 ? 'on' : ''}>밤</td>
                        <td className={HH === 12 && mm === 0  ? 'on' : ''}>정</td>
                        <td className={mm >= 20 && mm < 30 ? 'on' : ''}>이</td>
                        <td className={mm >= 30 && mm < 40 ? 'on' : ''}>삼</td>
                        <td className={mm >= 10 && mm < 40 ? 'on' : ''}>십</td>
                    </tr>
                    <tr>
                        <td className={mm >= 40 && mm < 50 ? 'on' : ''}>사</td>
                        <td className={mm >= 50 || (HH === 12 && mm === 0) ? 'on' : ''}>오</td>
                        <td className={mm >= 40 ? 'on' : ''}>십</td>
                        <td className={mm % 10 >= 5 ? 'on' : ''}>오</td>
                        <td className={mm >= 5 ? 'on' : ''}>분</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
});

const AnalogClock = ({date}: clockProps) => {
    const h_s = date.getHours() * 60 * 60;
    const m_s = date.getMinutes() * 60;
    const s = date.getSeconds();
    const hoursDeg = ((h_s + m_s + s) * 0.00833333);
    const minutesDeg = ((h_s + m_s + s) * 0.1);
    const secondsDeg = ((h_s + m_s + s) * 6);

    const hoursStyle = {
        transform: `rotate(${hoursDeg}deg)`
    };

    const minutesStyle = {
        transform: `rotate(${minutesDeg}deg)`
    };

    const secondsStyle = {
        transform: `rotate(${secondsDeg}deg)`
    };

    return (
        <div className={'analogClock'}>
            <div className={'hour'} style={hoursStyle}></div>
            <div className={'minute'} style={minutesStyle}></div>
            <div className={'second'} style={secondsStyle}></div>
            <div className={'pin'}></div>
        </div>
    );
};

const DigilogClocks = (({date, digilogClockList}: any) => {
    const ns = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
    const h1 = Math.floor(date.getHours() / 10);
    const h2 = date.getHours() % 10;
    const m1 = Math.floor(date.getMinutes() / 10);
    const m2 = date.getMinutes() % 10;
    const s1 = Math.floor(date.getSeconds() / 10);
    const s2 = date.getSeconds() % 10;

    return (
        <div className={'digilogClocks'}>
            <div className={'digilogClockWrap'}>
                <table>
                    <tbody>
                    {
                        digilogClockList.map((digilogClocks: any, index: number) => (
                            <tr key={index}>
                                {
                                    digilogClocks.map((clock: string, index: number) =>
                                        <td key={index}>
                                            <div className={
                                                'digilogClock ' +
                                                clock.replace(/(h1|h2|m1|m2|s1|s2)/gi, ((__: any) => {
                                                    switch (__) {
                                                        case 'h1':
                                                            return ns[h1];
                                                        case 'h2':
                                                            return ns[h2];
                                                        case 'm1':
                                                            return ns[m1];
                                                        case 'm2':
                                                            return ns[m2];
                                                        case 's1':
                                                            return ns[s1];
                                                        case 's2':
                                                            return ns[s2];
                                                        default:
                                                            return __;
                                                    }
                                                }))
                                            }>
                                                <div className={'h'}></div>
                                                <div className={'m'}></div>
                                            </div>
                                        </td>
                                    )
                                }
                            </tr>))
                    }
                    </tbody>
                </table>
            </div>
        </div>
    )
});

const Clock = () => {
    const [date, setDate] = useState(new Date());
    const [digilogClockList] = useState(clockList);

    useEffect(() => {
        const interval = setInterval(
            () => setDate(new Date()),
            1000
        );
        return () => {
            clearInterval(interval);
        }
    }, []);


    return (
        <div className={'clock'}>
            <div className={'clockWrap'}>
                <AnalogClock date={date}/>
                <DigilogClocks date={date} digilogClockList={digilogClockList}/>
                <KoreanClock date={date}/>
            </div>
        </div>
    );
};

export default Clock;
