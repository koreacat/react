import React from "react";
import "./ToolPalette.scss";
import ColorPalette from './ColorPalette';

interface ToolPaletteProp {
	color: string;
	penWidth: number;
	onChangeColor: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onChangePenWidth: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ToolPalette = (prop: ToolPaletteProp) => {
	const { color, penWidth, onChangeColor, onChangePenWidth } = prop;

	return (
		<div id="toolPalette">
			<ColorPalette color={color} onChangeColor={onChangeColor} />
			<input type="number" value={penWidth} onChange={onChangePenWidth} />
		</div>
	);
};

export default ToolPalette;
