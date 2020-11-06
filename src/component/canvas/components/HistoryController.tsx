import React, { useCallback } from "react";
import { usePressed } from "../hooks/usePressed";
import "./HistoryController.scss";

type HistoryControllerCommand = "undo" | "redo";

interface HistoryControllerItemProp {
	disabled: boolean;
	type: HistoryControllerCommand;
	changeHistory: () => void;
}

const HistoryControllerItem = (prop: HistoryControllerItemProp) => {
	const { disabled, type, changeHistory } = prop;
	const [ref, pressed] = usePressed<HTMLButtonElement>();

	const handleClick = useCallback(() => {
		changeHistory();
	}, [changeHistory]);

	return (
		<li>
			<button
				className={`${type} ${pressed ? "pressed" : ""}`}
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
	undoAvailable: boolean;
	redoAvailable: boolean;
}

const HistoryController = ({
	undo,
	redo,
	undoAvailable,
	redoAvailable,
}: HistoryControllerProp) => {
	return (
		<ul className="historyController">
			<HistoryControllerItem
				disabled={!undoAvailable}
				type="undo"
				changeHistory={undo}
			/>
			<HistoryControllerItem
				disabled={!redoAvailable}
				type="redo"
				changeHistory={redo}
			/>
		</ul>
	);
};

export default HistoryController;
