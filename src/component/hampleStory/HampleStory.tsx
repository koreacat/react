import React from 'react';
import './HampleStory.scss';

const HampleStory = () => {

    return (
        <div className={'hampleStory'}>
            <iframe width="100" height="100" 
                   src="https://www.youtube.com/embed/ZLIl-TDPZu0?amp;autoplay=1&amp;playlist=lDZnM3Uuq0E&amp;loop=1"
                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                   style={{position: 'absolute', right: 0, zIndex: 2}}  />
            <div className={'hampleStoryWrap'}>
            [Forest of patience]
            </div>
        </div>
    )
};

export default HampleStory;