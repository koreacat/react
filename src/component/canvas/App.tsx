import React, { Component } from "react";
import { Provider } from 'mobx-react';
import "./reset.scss";
import "./App.scss";
import Canvas from "./components/Canvas";
import CanvasStore from './store/CanvasStore'

const canvas = new CanvasStore({});
export default class App extends Component {
	render() {
		return (
			<div className="canvasContainer">
				<Provider canvas={canvas}>
					<Canvas />
				</Provider>
			</div>
		);
	}
}
