import React from "react";
import { Color } from "../../type";
import "./ColorPalette.scss";

const colors: Color[] = [
	{
		value: "red",
		name: "red",
	},
	{
		value: "orange",
		name: "orange",
	},
	{
		value: "yellow",
		name: "yellow",
	},
	{
		value: "green",
		name: "green",
	},
	{
		value: "blue",
		name: "blue",
	},
	{
		value: "indigo",
		name: "indigo",
	},
	{
		value: "purple",
		name: "purple",
	},
];

interface ColorItemProp {
	color: Color;
	checked: boolean;
	onChangeColor: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ColorItem = (prop: ColorItemProp) => {
	const { color, checked, onChangeColor } = prop;
	const { name, value } = color;

	return (
		<div>
			<label className="colorItem" style={{ backgroundColor: value }}>
				<input
					type="radio"
					value={value}
					checked={checked}
					onChange={onChangeColor}
					title={name}
				/>
			</label>
		</div>
	);
};

interface ToolPaletteProp {
	color: string;
	onChangeColor: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ColorPalette = (prop: ToolPaletteProp) => {
	const { color: selectedColor, onChangeColor } = prop;
	const colorItems = colors.map((color) => (
		<ColorItem
			color={color}
			checked={color.value === selectedColor}
			onChangeColor={onChangeColor}
			key={color.value}
		/>
	));
	return (
		<div className="colorPalette">
			<div className="colorPalettePopup">
				<div className="colorContainer">{colorItems}</div>
			</div>
		</div>
	);
};

export default ColorPalette;
