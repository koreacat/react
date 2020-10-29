import React, { useEffect, useState } from "react";
import "./HamTaker.scss";

import { MapType, basicMap } from "./maps";
import Characters from "./components/Characters";
import GameController from "./components/GameController";

const startPoint = () => {
	return { x: 0, y: 0 };
};

const stage = basicMap;

const HamTaker = () => {
	const distance = 50;
	const [clear, setClear] = useState(false);
	const [coordinates, setCoordinates] = useState(startPoint);
	const [life, setLife] = useState(10);
	const [spike, setSpike] = useState(false);
	const [failHeight, setFailHeight] = useState("0");
	const [failOpacity, setFailOpacity] = useState("0");
	const [controllable, setControllable] = useState(true);
	const [data, setData] = useState(stage);

	useEffect(() => {
		window.addEventListener("keydown", event);
		return () => {
			window.removeEventListener("keydown", event);
		};
	});

	const event = () => {
		document.getElementById("ham")?.focus();
	};

	const keyDown = (e: any) => {
		if (!controllable) return;
		clear && reset();
		switch (e.key) {
			case "ArrowUp":
				if (
					!data[coordinates.y - 1] ||
					!movable(coordinates.y - 1, coordinates.x, "UP")
				)
					return;
				setCoordinates({ x: coordinates.x, y: coordinates.y - 1 });
				break;
			case "ArrowDown":
				if (
					!data[coordinates.y + 1] ||
					!movable(coordinates.y + 1, coordinates.x, "DOWN")
				)
					return;
				setCoordinates({ x: coordinates.x, y: coordinates.y + 1 });
				break;
			case "ArrowLeft":
				if (
					!data[coordinates.x - 1] ||
					!movable(coordinates.y, coordinates.x - 1, "LEFT")
				)
					return;
				setCoordinates({ x: coordinates.x - 1, y: coordinates.y });
				break;
			case "ArrowRight":
				if (
					!data[coordinates.x + 1] ||
					!movable(coordinates.y, coordinates.x + 1, "RIGHT")
				)
					return;
				setCoordinates({ x: coordinates.x + 1, y: coordinates.y });
				break;
		}
	};

	const movable = (y: number, x: number, dir: string) => {
		if (life - 1 < 0 || clear) {
			reset();
			return;
		}
		switch (data[y][x]) {
			case MapType.land:
				setSpike(!spike);
				setLife(life - 1);
				let moveSound01 = new Audio(require("./sound/move.wav"));
				moveSound01.play();
				return true;
			case MapType.thorn:
				setSpike(!spike);
				if (life - 2 < 0) {
					reset();
					return;
				}
				setLife(life - 2);
				let spikesSound01 = new Audio(require("./sound/spikes.wav"));
				spikesSound01.play();
				return true;
			case MapType.goal:
				setSpike(!spike);
				setLife(life - 1);
				let moveSound02 = new Audio(require("./sound/move.wav"));
				moveSound02.play();

				let successSound = new Audio(require("./sound/success.wav"));
				successSound.play();
				setClear(true);
				return true;
			case MapType.skeleton:
				return false;
			case MapType.spikeTrap:
				setSpike(!spike);
				if (!spike && life - 2 < 0) {
					reset();
					return;
				}

				if (spike) {
					let moveSound03 = new Audio(require("./sound/move.wav"));
					moveSound03.play();
					setLife(life - 1);
				} else {
					let spikesSound02 = new Audio(require("./sound/spikes.wav"));
					spikesSound02.play();
					setLife(life - 2);
				}
				return true;
			case MapType.rock:
				if (moveRock(y, x, dir)) {
					setSpike(!spike);
					if (
						data[coordinates.y][coordinates.x] === MapType.spikeTrap &&
						!spike
					) {
						let spikesSound = new Audio(require("./sound/spikes.wav"));
						spikesSound.play();
						setLife(life - 2);
					} else {
						setLife(life - 1);
					}
				}
				return false;
			default:
				return false;
		}
	};

	const moveRock = (y: number, x: number, dir: string) => {
		let dy = y;
		let dx = x;

		dir === "UP" && dy--;
		dir === "DOWN" && dy++;
		dir === "LEFT" && dx--;
		dir === "RIGHT" && dx++;

		//진행 방향의 앞칸에 돌 옮길 수 있는지 체크
		if (data[dy] && data[dy][dx]) {
			//진행 방향의 앞칸이 땅이나 가시, 트랩, 골일 경우 그 방향으로 돌 옮기기
			if (data[dy][dx] === MapType.land) {
				data[dy][dx] = MapType.rock;
				data[y][x] = MapType.land;
				let stoneSound = new Audio(require("./sound/stone_kick.wav"));
				stoneSound.play();
				return true;
			}
		}
		return false;
	};

	const reset = () => {
		setControllable(false);
		// let deathSound = new Audio(require('./sound/death.wav'));
		// deathSound.play();
		failAnimation();
		setTimeout(function () {
			setData(stage);
			setLife(10);
			setCoordinates({ x: 0, y: 0 });
			setClear(false);
			setSpike(false);
		}, 350);

		setTimeout(function () {
			setControllable(true);
		}, 3000);
	};

	const failAnimation = () => {
		setFailHeight("50%");
		let part1Sound = new Audio(require("./sound/screen_changer_part1.wav"));
		part1Sound.play();

		setTimeout(function () {
			setFailOpacity("100");
		}, 350);

		setTimeout(function () {
			setFailOpacity("0");
			let part2Sound = new Audio(require("./sound/screen_changer_part2.wav"));
			part2Sound.play();
		}, 2200);

		setTimeout(function () {
			setFailHeight("0");
		}, 2500);
	};

	const hamTakerStyle = {
		width: distance,
		height: distance,
		transform: `translate(${coordinates.x * distance}px, ${
			coordinates.y * distance
		}px)`,
	};

	const failStyle = {
		height: failHeight,
	};

	const failStyleCenter = {
		opacity: failOpacity,
	};

	return (
		<div className={"hamTaker"}>
			<iframe
				width="100"
				height=" 100"
				src="https://www.youtube.com/embed/TzJW3OUSxKs?amp;autoplay=1&amp;playlist=lDZnM3Uuq0E&amp;loop=1"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				style={{ position: "absolute", right: 0, zIndex: 998 }}
			/>
			<div className={"hamTakerWrap"}>
				<div className={"map"}>
					<div
						id={"ham"}
						className={"ham"}
						tabIndex={0}
						onKeyDown={keyDown}
						style={hamTakerStyle}
					/>
					{data.map((line, x) => {
						return (
							<div key={x} className={"mapTile"}>
								{line.map((point, y) => {
									return (
										<p
											key={x + "" + y}
											className={
												point === MapType.spikeTrap
													? spike
														? "spikeTrapOn"
														: "spikeTrapOff"
													: MapType[point]
											}
											style={{ width: distance, height: distance }}
										/>
									);
								})}
							</div>
						);
					})}
					<h2 className={"life"}>{life}</h2>
				</div>
				<div
					className={"hamTakerSuccess"}
					style={{ display: clear ? "block" : "none" }}
				>
					<div className={"hamTakerSuccessLeft"} />
					<div className={"hamTakerSuccessRight"} />
					<div className={"hamTakerSuccessSentence"}>
						<h3>GLORIOUS</h3>
						<h2>SUCCESS</h2>
					</div>
				</div>
				<div className={"hamTakerFail"}>
					<div className={"hamTakerFailUp"} style={failStyle} />
					<div className={"hamTakerFailDown"} style={failStyle} />
					<div className={"hamTakerFailCenter"} style={failStyleCenter}>
						<h2>HAMTAKER</h2>
					</div>
				</div>
				<GameController keyDown={keyDown} />
			</div>
			<Characters />
		</div>
	);
};

export default HamTaker;
