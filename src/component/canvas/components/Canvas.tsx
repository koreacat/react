import React, {
	useCallback,
	useContext,
	useEffect,
	useRef,
	useState,
} from "react";
import { Coordinate } from "../type";
import "./Canvas.scss";
import HistoryController from "./HistoryController";
import ToolPalette from "./ToolPalette/ToolPalette";
import { MobXProviderContext, observer } from "mobx-react";
import CanvasStore from "../store/CanvasStore";

const Canvas = () => {
	const [canvasSize, setCanvasSize] = useState({
		width: window.innerWidth,
		height: window.innerHeight,
	});

	const { canvas } = useContext(MobXProviderContext) as { canvas: CanvasStore };
	const { color, lineWidth } = canvas;
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const prevCoordinate = useRef<Coordinate | null>(null);

	useEffect(() => {
		if (!canvasRef) return;
		canvas.changeCanvas(canvasRef);
	}, [canvas, canvasRef]);

	useEffect(() => {
		window.addEventListener("resize", () => {
			const { clientWidth: width, clientHeight: height } = document.body;
			setCanvasSize({ width, height });
		});
	}, []);

	const drawPoint = useCallback(
		(coordinate: Coordinate) => {
			canvas.drawPoint(coordinate);
		},
		[canvas]
	);

	const drawLine = useCallback(
		(coordinate: Coordinate) => {
			if (prevCoordinate.current)
				canvas.drawLine(prevCoordinate.current, coordinate);
		},
		[canvas]
	);

	const onClearCanvas = useCallback(() => {
		canvas.clearCanvas();
	}, [canvas]);

	const onChangeColor = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const color = e.target.value;
			canvas.changeColor(color);
		},
		[canvas]
	);

	const onChangePenWidth = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const penWidth = parseInt(e.target.value);
			canvas.changeLineWidth(penWidth);
		},
		[canvas]
	);

	const onMouseDown = useCallback(
		(e: React.MouseEvent) => {
			console.log("mouse down");
			switch (e.button) {
				case 0:
					// 마우스 좌클릭
					canvas.onDrawStart();
					const nextCoordinate: Coordinate = {
						x: e.clientX,
						y: e.clientY,
					};
					drawPoint(nextCoordinate);
					prevCoordinate.current = nextCoordinate;
					break;
			}
		},
		[canvas, drawPoint]
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

	const onMouseUp = useCallback(
		(e: React.MouseEvent) => {
			console.log("mouse up");
			e.preventDefault();
			switch (e.button) {
				case 0:
					canvas.onDrawEnd();
					break;
				case 3:
					canvas.undo();
					break;
				case 4:
					canvas.redo();
					break;
			}
		},
		[canvas]
	);

	const onTouchStart = useCallback(
		(e: React.TouchEvent) => {
			console.log("touch start");

			canvas.onDrawStart();
			const nextCoordinate: Coordinate = {
				x: e.touches[0].clientX,
				y: e.touches[0].clientY,
			};
			drawPoint(nextCoordinate);
			prevCoordinate.current = nextCoordinate;
		},
		[canvas, drawPoint]
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
		canvas.onDrawEnd();
	}, [canvas]);

	return (
		<div className="canvasWrapper">
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
				undo={() => canvas.undo()}
				redo={() => canvas.redo()}
				undoAvailable={canvas.undoAvailable}
				redoAvailable={canvas.redoAvailable}
			/>
			<ToolPalette
				color={color}
				penWidth={lineWidth}
				onChangeColor={onChangeColor}
				onChangePenWidth={onChangePenWidth}
				onClearCanvas={onClearCanvas}
			/>
		</div>
	);
};

export default observer(Canvas);
