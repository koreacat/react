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
	const {
		color,
		penWidth,
		onChangeColor,
		onChangePenWidth,
		onClearCanvas,
	} = prop;

	const [colorPaletteOpened, setColorPaletteOpened] = useState(false);

	const toggleColorPaletteOpened = useCallback(() => {
		setColorPaletteOpened(!colorPaletteOpened);
	}, [colorPaletteOpened]);

	return (
		<div id="toolPalette">
			{colorPaletteOpened && (
				<ColorPalette color={color} onChangeColor={onChangeColor} />
			)}
			<button
				id="colorPaletteButton"
				title="색상 팔레트"
				style={{ backgroundColor: color }}
				onClick={toggleColorPaletteOpened}
				onTouchStart={toggleColorPaletteOpened}
			/>
			<input
				id="penWidthInput"
				title="브러시 크기 및 불투명도"
				type="number"
				value={penWidth}
				onChange={onChangePenWidth}
			/>
			<button id="refreshButton" onClick={onClearCanvas} title={"초기화"} />
		</div>
	);
};

export default ToolPalette;
