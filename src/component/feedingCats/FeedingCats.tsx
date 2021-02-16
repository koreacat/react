import React, { useEffect } from 'react';
import './FeedingCats.scss';

let canvas: any = null;

const FeedingCats = () => {
    useEffect(() => {
        canvas = document.getElementById('feedingCatsCanvas');
    })


    return (
        <div className={'feedingCats'}>
			<div className={'feedingCatsWrap'}>
                <canvas id={'feedingCatsCanvas'}></canvas>
            </div>
        </div>
    )
}

export default FeedingCats;