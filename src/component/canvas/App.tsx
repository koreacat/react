import React, { Component } from "react";
import "./reset.scss";
import "./App.scss";
import Canvas from "./components/Canvas";

export default class App extends Component {
	constructor(prop: any) {
		super(prop);
	}

	render() {
		return (
			<div className="canvasContainer">
				<Canvas />
			</div>
		);
	}
}
