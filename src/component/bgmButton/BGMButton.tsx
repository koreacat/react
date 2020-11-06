import React, {useEffect, useRef} from "react";
import './BGMButton.scss';

interface BGMButtonProps {
    audio: HTMLAudioElement,
}

const BGMButton = (props: BGMButtonProps) => {
    const bgmCheckbox: any = useRef(null);
    const audio = props.audio;

    audio.addEventListener('ended', () => {
        audio.currentTime = 0;
        audio.play();
    });

    useEffect(() => {
        return(() => {
            audio.pause();
        })
    });

    return(
        <div className={'bgmButton'}>
            <label htmlFor={'bgmCheckbox'} className="bgmButtonWrap">
                <input ref={bgmCheckbox} type="checkbox" value="" name="bgmCheckbox" id={'bgmCheckbox'} onClick={() => {
                    bgmCheckbox.current.checked ? audio.play() : audio.pause();
                }}/>
                <label htmlFor={'bgmCheckbox'} className='bgmLabel' />
            </label>
        </div>
    )
};

export default BGMButton;
