import React from 'react';
import './HamKemon.scss';

const HamKemon = () => {

    return (
        <div className={'hamKemon'}>
            <iframe width="100" height="100" 
                   src="https://www.youtube.com/embed/86NxiMS7z0A?amp;autoplay=1&amp;playlist=lDZnM3Uuq0E&amp;loop=1" 
                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                   style={{position: 'absolute', right: 0, zIndex: 2}} />
            <div className={'hamKemonWrap'}>
            [Pokemon gold - gold vs red]
            </div>
        </div>
    )
};

export default HamKemon;