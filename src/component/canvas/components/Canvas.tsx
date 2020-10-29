import React, { useCallback, useState } from "react";
import { useCanvas, usePicasso } from "../hooks/useCanvas";
import { Coordinate } from "../type";
import "./Canvas.scss";

const Canvas = () => {
	const [isDrawing, setIsDrawing] = useState(false);
	const [canvasSize] = useState({
		width: window.innerWidth - 2,
		height: window.innerHeight - 80,
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
		setIsDrawing(true);
		const nextCoordinate: Coordinate = {
			x: e.clientX,
			y: e.clientY,
		};
		setCoordinate(nextCoordinate);
	}, []);

	const onMouseMove = useCallback(
		(e: React.MouseEvent) => {
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
			/>
		</div>
	);
};

export default Canvas;
