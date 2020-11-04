import React, { useCallback } from "react";
import { usePressed } from "../hooks/usePressed";
import "./HistoryController.scss";

type HistoryControllerCommand = "undo" | "redo";

interface HistoryControllerItemProp {
	disabled: boolean;
	type: HistoryControllerCommand;
	changeHistory: (command: HistoryControllerCommand) => void;
}

const HistoryControllerItem = (prop: HistoryControllerItemProp) => {
	const { disabled, type, changeHistory } = prop;
	const [ref, pressed] = usePressed<HTMLButtonElement>();

	const handleClick = useCallback(() => {
		changeHistory(type);
	}, [changeHistory, type]);

	return (
		<li>
			<button
				className={`${type} ${pressed ? 'pressed' : ''}`}
				onClick={handleClick}
				disabled={disabled}
				ref={ref}
			/>
		</li>
	);
};

interface HistoryControllerProp {
	undo: () => void;
	redo: () => void;
}

const HistoryController = ({undo, redo} : HistoryControllerProp) => {
	const isPrevAvailable = true;
	const isNextAvailable = true;
	return (
		<ul className="historyController">
			<HistoryControllerItem
				disabled={!isPrevAvailable}
				type="undo"
				changeHistory={undo}
			/>
			<HistoryControllerItem
				disabled={!isNextAvailable}
				type="redo"
				changeHistory={redo}
			/>
		</ul>
	);
};

export default HistoryController;
