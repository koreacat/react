import React, {useEffect} from 'react';
import './Matterjs.scss';
import Matter from 'matter-js';
import Random from "../../common/Random";

const { Engine, Render, Bodies, World, Mouse, MouseConstraint } = Matter;
let engine: any, render: any, canvas: any = null;
let worldAddInterval: any, worldClearInterval: any = null;
let mouse: any, mouseConstraint: any = null;

const init = () => {
	canvas = document.getElementById('matterjsCanvas');
	while (canvas.hasChildNodes()) canvas.removeChild(canvas.firstChild);
	engine = Engine.create();
	render = Render.create({element: canvas, engine: engine, options: {
			width: 600,
			height: 500,
			wireframes: false
		}
	});
};

const draw = () => {
	let ground = Bodies.rectangle(300, 480, 600, 50, {isStatic: true});
	let wallA = Bodies.rectangle(10, 250, 50, 500, {isStatic: true});
	let wallB = Bodies.rectangle(590, 250, 50, 500, {isStatic: true});
	World.add(engine.world, [ground, wallA, wallB]);

	const options = () => {
		return {
			restitution: 1.0,
			render: {
				fillStyle: `RGB(${Random.getInteger(126, 255)}, ${Random.getInteger(126, 255)}, ${Random.getInteger(126, 255)})`,
				strokeStyle: '#ddd',
				lineWidth: 0
			}
		}
	};

	worldAddInterval = setInterval(() => {
		World.add(engine.world, [
			Bodies.circle(Random.getInteger(40, 550), -100, Random.getInteger(20, 40), options())
		]);
	}, 200);

	worldClearInterval = setInterval(() => {
		clear();
	}, 20000);
};

const event = () => {
	const options: any = () => {
		return {
			mouse: mouse,
			constraint: {
				stiffness: 0.2,
				render: {
					visible: false
				}
			}
		}
	};

	mouse = Mouse.create(render.canvas);
	mouseConstraint = MouseConstraint.create(engine, options());
	World.add(engine.world, mouseConstraint);
	render.mouse = mouse;
};

const run = () => {
	Engine.run(engine);
	Render.run(render);
};

const clear = () => {
	World.clear(engine.world, true);
	event();
};

const Matterjs = () => {
	useEffect(() => {
		init();
		draw();
		event();
		run();

		return () => {
			clearInterval(worldAddInterval);
			clearInterval(worldClearInterval);
		}
	}, []);

	return (
		<div className={'matterjs'}>
			<div className={'matterjsWrap'}>
				<div id={'matterjsCanvas'} className={'matterjsCanvas'} />
			</div>
		</div>
	)
};

export default Matterjs;
