import React, { useCallback, useEffect, useRef, useState } from "react";
import "./Canvas.scss";

interface Coordinate {
	x: number;
	y: number;
}

const Canvas = () => {
	const [isDrawing, setIsDrawing] = useState(false);
	const [canvasSize, setCanvasSize] = useState({
		width: window.innerWidth,
		height: window.innerHeight - 80,
	});
	const [coordinate, setCoordinate] = useState<Coordinate>({
		x: 0,
		y: 0,
	});

	const canvasRef = useRef<HTMLCanvasElement>(null);
	const isCanvasLoaded = !!canvasRef.current;
	const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>();

	useEffect(() => {
		setCtx(canvasRef.current?.getContext("2d"));
	}, [canvasRef]);

	const draw = useCallback(
		(nextCoordinate: Coordinate) => {
			if (!isDrawing) return;
			console.log(nextCoordinate, coordinate);
			ctx?.beginPath();
			ctx?.moveTo(coordinate.x, coordinate.y);
			ctx?.lineTo(nextCoordinate.x, nextCoordinate.y);
			// ctx!.strokeStyle = "green";
			ctx!.lineWidth = 1;
			ctx?.stroke();
			ctx?.closePath();
		},
		[coordinate, ctx, isDrawing]
	);

	const onMouseDown = useCallback((e: React.MouseEvent) => {
		setIsDrawing(true);
		const nextCoordinate: Coordinate = {
			x: e.clientX,
			y: e.clientY,
		};
		console.log(nextCoordinate);
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

	const onMouseOut = useCallback((e: React.MouseEvent) => {
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
