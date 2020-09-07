import React, {useState, useEffect, useCallback, Component} from 'react';
import './Clock.scss';
import DateFormat from '../../common/DateFormat';
import {clockProps} from './type';

const DigitalClock = ({date}: clockProps) => {
    return (
        <div className={'digitalClock'}>
            <p>
                <span>{DateFormat(date,'a/p hh:mm:ss')}</span>
                <span>{DateFormat(date,'yyyy-MM-dd ES')}</span>
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

const DigilogClocks = (({date, digilogClocks}: any) => {
    console.log(digilogClocks);

    return (
        <div className={'digilogClocks'}>
            <table>

            </table>
        </div>
    )
});

const Clock = () => {
    let arr = Array.from(Array(12), () => Array(24).fill(null));
    for(let i=0; i<12; i++){
        for(let j=0; j<24; j++){
            if(i<3 || i>8 || j==0 || j==23 || (i==3 && (j==11 || j==12)) || (i==8 && (j==11 || j==12))){
                arr[i][j] = '--';
            }
            else if((i==4 && j==11) || (i==6 && j==11)){
                arr[i][j] = ':00'
            }
            else if((i==4 && j==12) || (i==6 && j==12)){
                arr[i][j] = ':01'
            }
            else if((i==5 && j==11) || (i==7 && j==11)){
                arr[i][j] = ':10'
            }
            else if((i==5 && j==12) || (i==7 && j==12)){
                arr[i][j] = ':11'
            }
        }
    }


    const [date, setDate] = useState(new Date());
    const [digilog, setDigilog] = useState(true);
    const [digilogClocks, setDigilogClocks] = useState(arr);




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

    return(
        <div className={'clock'} onClick={clockClick}>
            {!digilog ?
                <>
                    <AnalogClock date={date}/>
                    <DigitalClock date={date}/>
                </>
                :
                <DigilogClocks date={date} digilogClocks={digilogClocks}/>
            }
        </div>
    );
};

export default Clock;