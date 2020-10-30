import React, { useCallback, useEffect, useRef, useState } from "react";
import { usePicasso } from "../hooks/useCanvas";
import { Coordinate } from "../type";
import "./Canvas.scss";
import ToolPalette from "./ToolPalette/ToolPalette";

interface CanvasProp {
	color?: string;
	toolOption?: Object;
}

const Canvas = (prop: CanvasProp) => {
	const [drawable, setDrawable] = useState(false);
	const [canvasSize] = useState({
		width: window.innerWidth - 2,
		height: window.innerHeight,
	});
	const [color, setColor] = useState("black");
	const [penWidth, setPenWidth] = useState(1);
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [canvasLoaded, setCanvasLoaded] = useState(false);
	const [picasso] = usePicasso(color,penWidth, canvasRef);

	useEffect(() => {
		if(!canvasRef) return;

		picasso.canvas = canvasRef
		setCanvasLoaded(true);
	}, [canvasRef, picasso]);

	const draw = useCallback(
		(coordinate: Coordinate) => {
			if (!drawable) return;
			picasso?.drawLine(coordinate);
		},
		[picasso, drawable]
	);

	const onClearCanvas = useCallback(() => {
		picasso.clear();
	}, [picasso])

	const onChangeColor = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const color = e.target.value;
			setColor(color);
			picasso.strokeStyle = color;
		},
		[picasso]
	);

	const onChangePenWidth = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const penWidth = parseInt(e.target.value);
			setPenWidth(penWidth)
			picasso.lineWidth = penWidth;
		},
		[picasso]
	);

	const onMouseDown = useCallback((e: React.MouseEvent) => {
		console.log("mouse down");
		setDrawable(true);
	}, []);

	const onMouseMove = useCallback(
		(e: React.MouseEvent) => {
			console.log("mouse move");
			if (!drawable) return;
			const nextCoordinate: Coordinate = {
				x: e.clientX,
				y: e.clientY,
			};
			draw(nextCoordinate);
		},
		[drawable]
	);

	const onMouseUp = useCallback(() => {
		console.log("mouse out");
		setDrawable(false);
	}, []);

	const onTouchStart = useCallback((e: React.TouchEvent) => {
		console.log("touch start");
		setDrawable(true);
	}, []);

	const onTouchMove = useCallback(
		(e: React.TouchEvent) => {
			console.log("touch move");

			if (!drawable) return;
			const nextCoordinate: Coordinate = {
				x: e.touches[0].clientX,
				y: e.touches[0].clientY,
			};
			draw(nextCoordinate);
		},
		[drawable]
	);

	const onTouchEnd = useCallback(() => {
		console.log("touch end");
		setDrawable(false);
	}, []);

	return (
		<div className="canvasWrapper">
			<p>{!canvasLoaded && "캔버스 로딩 중"}</p>
			<canvas
				ref={canvasRef}
				className="canvas"
				width={canvasSize.width}
				height={canvasSize.height}
				onMouseUp={onMouseUp}
				onMouseDown={onMouseDown}
				onMouseMove={onMouseMove}
				onTouchStart={onTouchStart}
				onTouchMove={onTouchMove}
				onTouchEnd={onTouchEnd}
			/>
			<ToolPalette
				color={color}
				penWidth={penWidth}
				onChangeColor={onChangeColor}
				onChangePenWidth={onChangePenWidth}
				onClearCanvas={onClearCanvas}
			/>
		</div>
	);
};

export default Canvas;
