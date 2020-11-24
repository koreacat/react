import React, {useRef, useState} from "react";
import './PokemonPlus.scss';

const PokemonPlus = () => {
	const circle = useRef(null);
	const [circleAnimation, setCircleAnimation] = useState('');

	const click = () => {
		if(circleAnimation !== '') return;
		setCircleAnimation('rainbow  1s');
		setTimeout(() => {
			setCircleAnimation('');
		}, 1000)
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
