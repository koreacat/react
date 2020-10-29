import React, { useCallback, useState } from "react";
import { useCanvas, usePicasso } from "../hooks/useCanvas";
import { Coordinate } from "../type";
import "./Canvas.scss";

const Canvas = () => {
	const [isDrawing, setIsDrawing] = useState(false);
	const [canvasSize] = useState({
		width: window.innerWidth - 2,
		height: window.innerHeight,
	});
	const [coordinate, setCoordinate] = useState<Coordinate>({ x: 0, y: 0 });
	const [canvasRef, ctx] = useCanvas();
	const isCanvasLoaded = !!canvasRef.current;
	const [picasso] = usePicasso(ctx);

	const draw = useCallback(
		(nextCoordinate: Coordinate) => {
			if (!isDrawing) return;
			picasso?.drawLine(coordinate, nextCoordinate);
		},
		[coordinate, picasso, isDrawing]
	);

	const onMouseDown = useCallback((e: React.MouseEvent) => {
		console.log('mouse down');
		setIsDrawing(true);
		const nextCoordinate: Coordinate = {
			x: e.clientX,
			y: e.clientY,
		};
		setCoordinate(nextCoordinate);
	}, []);

	const onMouseMove = useCallback(
		(e: React.MouseEvent) => {
		console.log('mouse move');
			if (!isDrawing) return;
			const nextCoordinate: Coordinate = {
				x: e.clientX,
				y: e.clientY,
			};
			draw(nextCoordinate);
			setCoordinate(nextCoordinate);
		},
		[isDrawing, coordinate]
	);

	const onMouseOut = useCallback(() => {
		console.log('mouse out');
		setIsDrawing(false);
	}, []);

	const onTouchStart = useCallback((e: React.TouchEvent) => {
		console.log('touch start');
		setIsDrawing(true);
		const nextCoordinate: Coordinate = {
			x: e.touches[0].clientX,
			y: e.touches[0].clientY,
		};
		setCoordinate(nextCoordinate);
	}, []);

	const onTouchMove = useCallback(
		(e: React.TouchEvent) => {
		console.log('touch move');
			
			if (!isDrawing) return;
			const nextCoordinate: Coordinate = {
				x: e.touches[0].clientX,
				y: e.touches[0].clientY,
			};
			draw(nextCoordinate);
			setCoordinate(nextCoordinate);
		},
		[isDrawing, coordinate]
	);

	const onTouchEnd = useCallback(() => {
		console.log('touch end');
		setIsDrawing(false);
	}, []);

	return (
		<div className="canvasWrapper">
			<p>{!isCanvasLoaded && "캔버스 로딩 중"}</p>
			<canvas
				ref={canvasRef}
				className="canvas"
				width={canvasSize.width}
				height={canvasSize.height}
				onMouseUp={onMouseOut}
				onMouseDown={onMouseDown}
				onMouseMove={onMouseMove}
				onTouchStart={onTouchStart}
				onTouchMove={onTouchMove}
				onTouchEnd={onTouchEnd}
			/>
		</div>
	);
};

export default Canvas;
