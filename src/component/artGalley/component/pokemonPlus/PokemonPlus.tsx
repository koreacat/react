import React, {useRef, useState} from "react";
import './PokemonPlus.scss';
import Random from "../../../../common/Random";

const PokemonPlus = () => {
	const circle = useRef(null);
	const [circleAnimation, setCircleAnimation] = useState('');

	const click = () => {
		if(circleAnimation !== '') return;
		Random.getInteger(0, 100) > 40 ? setCircleAnimation('red  1.0s') : setCircleAnimation('rainbow 1.5s ease-in-out');
		setTimeout(() => {
			setCircleAnimation('');
		}, 1500)
	};

	const circleStyle = {
		animation: circleAnimation
	};

	return (
		<div className={'pokemonPlus'}>
			<div className={'pokemonPlusWrap'}>
				<div ref={circle} className={'circle'} onClick={click} style={circleStyle}></div>
			</div>
		</div>
	)
};

export default PokemonPlus;
