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
            [Forest of patience]<br />
            중력 구현<br />
            화면 스크롤 구현<br />
            발판판정<br />
            피격판정<br />
            </div>
        </div>
    )
};

export default HampleStory;