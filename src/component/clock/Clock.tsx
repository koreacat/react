import React, { useState, useEffect } from 'react';
import './Clock.scss';
import '../../common/DateFormat'
import { Transform } from 'stream';

interface clockProps {
    time: Date;
};

const DigitalClock = ({time}: clockProps) => {
    //@ts-ignore
    const t = String(time.format('yyyy-MM-dd ES'));
    return (
        <div className={"digitalClock"}>
            <span>{t}</span>
        </div>
    )
}

const AnalogClock = ({time}: clockProps) => {
    const total = (time.getHours() * 60 * 60) + (time.getMinutes() * 60) + time.getSeconds(); 
    const hoursDeg = (total * 0.00833333) % 360;
    const minutesDeg = (((time.getMinutes() * 60) + time.getSeconds()) * 0.1) % 360;
    const secondsDeg = time.getSeconds() * 6;

    const hoursStyle = {
        transform: `rotate(${hoursDeg}deg)`
    }
    
    const minutesStyle = {
        transform: `rotate(${minutesDeg}deg)`
    }

    const secondsStyle = {
        transform: `rotate(${secondsDeg}deg)`
    }

    return (
        <div className={"analogClock"}>
            <div className={"hour"} style={hoursStyle}></div>
            <div className={"minute"} style={minutesStyle}></div>
            <div className={"second"} style={secondsStyle}></div>
            <div className={"pin"}></div>
        </div>
    );
};



const Clock = () => {
    const [time, setTime] = useState(new Date());
    useEffect(() => {
        const interval = setInterval(
            () => setTime(new Date()),
            1000
          );
          return () => {
            clearInterval(interval);
          }
    }, []);
    

    return(
        <div className={"clock"}>
            <AnalogClock time={time}/>
            <DigitalClock time={time}/>
        </div>
    );
};

export default Clock;