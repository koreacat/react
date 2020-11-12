import React, { useCallback, useContext } from "react";
import "./Gallery.scss";
import { MobXProviderContext, observer } from "mobx-react";
import GalleryStore from "../../store/GalleryStore";

interface PictureFrameProp {
	url: string;
	idx: number;
	changeFrameIdx: (idx: number) => void;
}

function PictureFrame({ url, idx, changeFrameIdx }: PictureFrameProp) {
	const onClick = useCallback(() => {
		changeFrameIdx(idx);
	}, [changeFrameIdx, idx]);

	return (
		<li className="frame" onClick={onClick}>
			<button style={{ backgroundImage: `url("${url}")` }}></button>
		</li>
	);
}

function Gallery() {
	const { gallery } = useContext(MobXProviderContext) as {
		gallery: GalleryStore;
	};
	const { frames, changeFrameIdx, createFrame } = gallery;
	const frameEls = frames.map((image, i) => (
		<PictureFrame key={i} url={image} idx={i} changeFrameIdx={changeFrameIdx} />
	));
	return (
		<div>
			<button className="createButton" onClick={createFrame}>+</button>
			<ol className="frames">{frameEls}</ol>
		</div>
	);
}

export default observer(Gallery);
