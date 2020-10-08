import React, {useState, useEffect, useCallback} from 'react';
import './Clock.scss';
import DateFormat from '../../common/DateFormat';
import {clockProps, clockList} from './type';


const KoreanClock = (({date}: clockProps) => {
    return (
        <div className={'koreanClock'}>
            <div className={'koreanClockWrap'}>
                <table>
                    <tbody>
                    <tr>
                        <td className={parseInt(DateFormat(date, 'HH')) >= 9 && parseInt(DateFormat(date, 'HH')) < 21 ? 'on' : ''}>낮</td>
                        <td className={parseInt(DateFormat(date, 'hh')) === 5 ? 'on' : ''}>다</td>
                        <td className={parseInt(DateFormat(date, 'hh')) === 7 ? 'on' : ''}>일</td>
                        <td className={parseInt(DateFormat(date, 'hh')) === 3 ? 'on' : ''}>세</td>
                        <td className={parseInt(DateFormat(date, 'hh')) === 4 ? 'on' : ''}>네</td>
                    </tr>
                    <tr>
                        <td className={parseInt(DateFormat(date, 'hh')) === 6 || parseInt(DateFormat(date, 'hh')) === 8 ? 'on' : ''}>여</td>
                        <td className={parseInt(DateFormat(date, 'hh')) === 5 || parseInt(DateFormat(date, 'hh')) === 6 ? 'on' : ''}>섯</td>
                        <td className={parseInt(DateFormat(date, 'hh')) === 7 ? 'on' : ''}>곱</td>
                        <td className={parseInt(DateFormat(date, 'hh')) >= 10 ? 'on' : ''}>열</td>
                        <td className={parseInt(DateFormat(date, 'hh')) === 1 || parseInt(DateFormat(date, 'hh')) === 11 ? 'on' : ''}>한</td>
                    </tr>
                    <tr>
                        <td className={parseInt(DateFormat(date, 'hh')) === 8 ? 'on' : ''}>덟</td>
                        <td className={parseInt(DateFormat(date, 'hh')) === 9 ? 'on' : ''}>아</td>
                        <td className={parseInt(DateFormat(date, 'hh')) === 9 ? 'on' : ''}>홉</td>
                        <td className={parseInt(DateFormat(date, 'hh')) === 2 || parseInt(DateFormat(date, 'hh')) === 12 ? 'on' : ''}>두</td>
                        <td className={'on'}>시</td>
                    </tr>
                    <tr>
                        <td className={parseInt(DateFormat(date, 'HH')) >= 21 || parseInt(DateFormat(date, 'HH')) < 9 ? 'on' : ''}>밤</td>
                        <td className={parseInt(DateFormat(date, 'HH')) === 12 ? 'on' : ''}>정</td>
                        <td className={parseInt(DateFormat(date, 'mm')) >= 20 && parseInt(DateFormat(date, 'mm')) < 30 ? 'on' : ''}>이</td>
                        <td className={parseInt(DateFormat(date, 'mm')) >= 30 && parseInt(DateFormat(date, 'mm')) < 40 ? 'on' : ''}>삼</td>
                        <td className={parseInt(DateFormat(date, 'mm')) >= 10 && parseInt(DateFormat(date, 'mm')) < 40 ? 'on' : ''}>십</td>
                    </tr>
                    <tr>
                        <td className={parseInt(DateFormat(date, 'mm')) >= 40 && parseInt(DateFormat(date, 'mm')) < 50 ? 'on' : ''}>사</td>
                        <td className={parseInt(DateFormat(date, 'mm')) >= 50 || parseInt(DateFormat(date, 'HH')) === 12 ? 'on' : ''}>오</td>
                        <td className={parseInt(DateFormat(date, 'mm')) >= 40 ? 'on' : ''}>십</td>
                        <td className={parseInt(DateFormat(date, 'mm')) % 10 >= 5 ? 'on' : ''}>오</td>
                        <td className={parseInt(DateFormat(date, 'mm')) >= 5 ? 'on' : ''}>분</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
});

const DigitalClock = ({date}: clockProps) => {
    return (
        <div className={'digitalClock'}>
            <p>
                <span>{DateFormat(date, 'a/p hh:mm:ss')}</span>
                <span>{DateFormat(date, 'yyyy-MM-dd ES')}</span>
            </p>
        </div>
    )
};

const AnalogClock = ({date}: clockProps) => {
    const h_s = date.getHours() * 60 * 60;
    const m_s = date.getMinutes() * 60;
    const s = date.getSeconds();
    const hoursDeg = ((h_s + m_s + s) * 0.00833333) % 360;
    const minutesDeg = ((m_s + s) * 0.1) % 360;
    const secondsDeg = s * 6;

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
    const [digilogClockList, setDigilogClockList] = useState(clockList);

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
            <AnalogClock date={date}/>
            <DigitalClock date={date}/>
            <DigilogClocks date={date} digilogClockList={digilogClockList}/>
            <KoreanClock date={date}/>
        </div>
    );
};

export default Clock;