import React, {useEffect} from 'react';
import './Matterjs.scss';
import Matter from 'matter-js';
import Random from "../../common/Random";

const { Engine, Render, Bodies, World, Mouse, MouseConstraint, Composite } = Matter;
let engine: any, render: any, canvas: any = null;
let worldAddInterval: any, worldAddStopTimeout: any = null;
let mouse: any, mouseConstraint: any = null;

const ground = Bodies.rectangle(150, 495, 280, 5, {isStatic: true});
const wallA = Bodies.rectangle(5, 250, 5, 550, {isStatic: true});
const wallB = Bodies.rectangle(295, 250, 5, 550, {isStatic: true});

const init = () => {
	canvas = document.getElementById('matterjsCanvas');
	while (canvas.hasChildNodes()) canvas.removeChild(canvas.firstChild);
	engine = Engine.create();
	render = Render.create({element: canvas, engine: engine, options: {
			width: 300,
			height: 500,
			wireframes: false
		}
	});
	World.add(engine.world, [ground, wallA, wallB]);
};

const draw = () => {
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

	clearInterval(worldAddInterval);
	worldAddInterval = setInterval(() => {
		World.add(engine.world, [
			Bodies.circle(Random.getInteger(50, 240), -10, Random.getInteger(20, 30), options()),
			Bodies.rectangle(Random.getInteger(50, 240), -10, Random.getInteger(20, 30), Random.getInteger(20, 30), options())
		]);
	}, 200);

	clearTimeout(worldAddStopTimeout);
	worldAddStopTimeout = setTimeout(() => {
		clearInterval(worldAddInterval);
	}, 10000);
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

const flush = () => {
	clearInterval(worldAddInterval);
	Composite.remove(engine.world, ground);
};

const block = () => {
	draw();
	Composite.remove(engine.world, ground);
	World.add(engine.world, ground);
};

const Matterjs = () => {
	useEffect(() => {
		init();
		draw();
		event();
		run();

		return () => {
			clearInterval(worldAddInterval);
		}
	}, []);

	return (
		<div className={'matterjs'}>
			<div className={'matterjsWrap'}>
				<div id={'matterjsCanvas'} className={'matterjsCanvas'} />
				<div>
					<button onClick={flush}>flush</button>
					<button onClick={block}>block</button>
				</div>
			</div>
		</div>
	)
};

export default Matterjs;
