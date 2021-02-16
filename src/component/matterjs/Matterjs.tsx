import React, {useEffect, useRef} from 'react';
import './Matterjs.scss';
import Matter from 'matter-js';

const Matterjs = () => {
	useEffect(() => {
		const { Engine, Render, Bodies, World } = Matter;
		let engine = Engine.create();
		let canvas = document.getElementById('matterjsCanvas');

		// @ts-ignore
		let render = Render.create({element: canvas, engine: engine, options: {
				width: '600',
				height: '500',
			}
		});

		let ground = Bodies.rectangle(300, 480, 600, 10, {isStatic: true});
		let wallA = Bodies.rectangle(10, 250, 10, 500, {isStatic: true});
		let wallB = Bodies.rectangle(590, 250, 10, 500, {isStatic: true});

		let circleA = Bodies.circle(400, 200, 40, {
			// friction: 0.001,
			// frictionAir: 0.01,
			restitution: 0.9,
		});
		let circleB = Bodies.circle(450, 50, 60, {
			restitution: 0.9,
		});

		World.add(engine.world, [circleA, circleB, ground, wallA, wallB]);
		Engine.run(engine);
		Render.run(render);
	});



	return (
		<div className={'matterjs'}>
			<div className={'matterjsWrap'}>
				<div id={'matterjsCanvas'} className={'matterjsCanvas'}></div>
			</div>
		</div>
	)
};

export default Matterjs;
