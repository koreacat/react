import React, { useState, useEffect, useCallback } from 'react';
import './Clock.scss';
import DateFormat from '../../common/DateFormat';
import { clockProps, clockList } from './type';

const DigitalClock = ({ date }: clockProps) => {
    return (
        <div className={'digitalClock'}>
            <p>
                <span>{DateFormat(date, 'a/p hh:mm:ss')}</span>
                <span>{DateFormat(date, 'yyyy-MM-dd ES')}</span>
            </p>
        </div>
    )
};

const AnalogClock = ({ date }: clockProps) => {
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

const DigilogClocks = (({ date, digilogClocks }: any) => {
    const ns = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
    const h1 = Math.floor(date.getHours() / 10);
    const h2 = date.getHours() % 10;
    const m1 = Math.floor(date.getMinutes() / 10);
    const m2 = date.getMinutes() % 10;
    const s1 = Math.floor(date.getSeconds() / 10);
    const s2 = date.getSeconds() % 10;

    return (
        <div className={'digilogClocks'}>
            <table>
                <tbody>
                    {
                     digilogClocks.map((digilogClock: any, index: number) => (
                     <tr key={index}>
                         {
                             digilogClock.map((clock: string, index: number) => 
                                <td key={index}>
                                    <div className={
                                        'digilogClock ' + 
                                        clock.replace(/(h1|h2|m1|m2|s1|s2)/gi, ((__: any) => {
                                            switch (__) {
                                                case 'h1': return ns[h1];
                                                case 'h2': return ns[h2];
                                                case 'm1': return ns[m1];
                                                case 'm2': return ns[m2];
                                                case 's1': return ns[s1];
                                                case 's2': return ns[s2];
                                                default: return __;
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
    )
});

const Clock = () => {
    const [date, setDate] = useState(new Date());
    const [digilog, setDigilog] = useState(true);
    const [digilogClocks, setDigilogClocks] = useState(clockList);

    useEffect(() => {
        const interval = setInterval(
            () => setDate(new Date()),
            1000
        );
        return () => {
            clearInterval(interval);
        }
    }, []);

    const clockClick = useCallback(() => {
        setDigilog(!digilog);
    }, [digilog]);

    return (
        <div className={'clock'} onClick={clockClick}>
            {!digilog ?
                <>
                    <AnalogClock date={date} />
                    <DigitalClock date={date} />
                </>
                :
                <DigilogClocks date={date} digilogClocks={digilogClocks} />
            }
        </div>
    );
};

export default Clock;