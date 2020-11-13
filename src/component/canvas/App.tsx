import React, { Component } from "react";
import { observer, Provider } from "mobx-react";
import "./App.scss";
import Canvas from "./components/Canvas";
import CanvasRootStore from "./store/CanvasRootStore";
import Gallery from "./components/Gallery/Gallery";

const rootStore = new CanvasRootStore();

@observer
class App extends Component {
	render() {
		const { canvasStore, galleryStore } = rootStore;
		return (
			<div className="canvasContainer">
				<Provider gallery={galleryStore} canvas={canvasStore}>
					{galleryStore.frameIdx === null ? <Gallery /> : <Canvas />}
				</Provider>
			</div>
		);
	}
}

export default App;
