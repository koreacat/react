import React, {useRef} from "react";
import './BGMButton.scss';

interface BGMButtonProps {
    src: string,
}

const BGMButton = (props: BGMButtonProps) => {
    const bgmCheckbox: any = useRef(null);
    const audio = new Audio(require(`./sound/${props.src}`));

    audio.addEventListener('ended', () => {
        audio.currentTime = 0;
        audio.play();
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