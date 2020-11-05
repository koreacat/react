import React, { useCallback, useEffect, useRef, useState } from "react";
import { usePicasso } from "../hooks/useCanvas";
import { Coordinate } from "../type";
import "./Canvas.scss";
import HistoryController from "./HistoryController";
import ToolPalette from "./ToolPalette/ToolPalette";

const Canvas = () => {
	const [canvasSize] = useState({
		width: window.innerWidth,
		height: window.innerHeight,
	});
	const [color, setColor] = useState("black");
	const [penWidth, setPenWidth] = useState(20);
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [canvasLoaded, setCanvasLoaded] = useState(false);
	const [picasso] = usePicasso(color, penWidth);
	const prevCoordinate = useRef<Coordinate | null>(null);

	useEffect(() => {
		if (!canvasRef) return;

		picasso.canvas = canvasRef;
		setCanvasLoaded(true);
	}, [canvasRef, picasso]);

	const setDrawable = useCallback(
		(drawable: boolean) => {
			picasso.drawable = drawable;
		},
		[picasso]
	);

	const drawPoint = useCallback(
		(coordinate: Coordinate) => {
			picasso?.drawPoint(coordinate);
		},
		[picasso]
	);

	const drawLine = useCallback(
		(coordinate: Coordinate) => {
			if (prevCoordinate.current)
				picasso?.drawLine(prevCoordinate.current, coordinate);
		},
		[picasso]
	);

	const onClearCanvas = useCallback(() => {
		picasso.clearCanvas();
	}, [picasso]);

	const onChangeColor = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const color = e.target.value;
			setColor(color);
			picasso.color = color;
		},
		[picasso]
	);

	const onChangePenWidth = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const penWidth = parseInt(e.target.value);
			setPenWidth(penWidth);
			picasso.lineWidth = penWidth;
		},
		[picasso]
	);

	const onMouseDown = useCallback(
		(e: React.MouseEvent) => {
			console.log("mouse down");
			picasso.drawStart();
			setDrawable(true);
			const nextCoordinate: Coordinate = {
				x: e.clientX,
				y: e.clientY,
			};
			drawPoint(nextCoordinate);
			prevCoordinate.current = nextCoordinate;
		},
		[drawPoint, picasso, setDrawable]
	);

	const onMouseMove = useCallback(
		(e: React.MouseEvent) => {
			// console.count("mouse move");
			const nextCoordinate: Coordinate = {
				x: e.clientX,
				y: e.clientY,
			};
			drawLine(nextCoordinate);
			prevCoordinate.current = nextCoordinate;
		},
		[drawLine]
	);

	const onMouseUp = useCallback(() => {
		console.log("mouse up");
		setDrawable(false);
	}, [setDrawable]);

	const onTouchStart = useCallback(
		(e: React.TouchEvent) => {
			console.log("touch start");

			picasso.drawStart();
			setDrawable(true);
			const nextCoordinate: Coordinate = {
				x: e.touches[0].clientX,
				y: e.touches[0].clientY,
			};
			drawPoint(nextCoordinate);
			prevCoordinate.current = nextCoordinate;
		},
		[drawPoint, picasso, setDrawable]
	);

	const onTouchMove = useCallback(
		(e: React.TouchEvent) => {
			console.log("touch move");

			const nextCoordinate: Coordinate = {
				x: e.touches[0].clientX,
				y: e.touches[0].clientY,
			};
			drawLine(nextCoordinate);
			prevCoordinate.current = nextCoordinate;
		},
		[drawLine]
	);

	const onTouchEnd = useCallback(() => {
		console.log("touch end");
		setDrawable(false);
	}, [setDrawable]);

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
			<HistoryController
				undo={() => picasso.undo()}
				redo={() => picasso.redo()}
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
