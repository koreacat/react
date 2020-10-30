import React, { useCallback, useState } from "react";
import "./ToolPalette.scss";
import ColorPalette from "./ColorPalette";

interface ToolPaletteProp {
	color: string;
	penWidth: number;
	onChangeColor: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onChangePenWidth: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onClearCanvas: () => void;
}

const ToolPalette = (prop: ToolPaletteProp) => {
	const { color, penWidth, onChangeColor, onChangePenWidth, onClearCanvas } = prop;

	const [colorPaletteOpened, setColorPaletteOpened] = useState(false);

	const toggleColorPaletteOpened = useCallback(() => {
		setColorPaletteOpened(!colorPaletteOpened);
	}, [colorPaletteOpened]);

	return (
		<div id="toolPalette">
			<button
				id="colorPaletteButton"
				title="색상 팔레트"
				style={{ backgroundColor: color }}
				onClick={toggleColorPaletteOpened}
				onTouchStart={toggleColorPaletteOpened}
			/>
			{colorPaletteOpened && (
				<ColorPalette color={color} onChangeColor={onChangeColor} />
			)}
			<input type="number" value={penWidth} onChange={onChangePenWidth} />
			<button id="refreshButton" onClick={onClearCanvas} title={"canvas 초기화"} />
		</div>
	);
};

export default ToolPalette;
