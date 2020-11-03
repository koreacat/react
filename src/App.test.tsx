import React from "react";
import { render } from "@testing-library/react";
import App from "./App";
import 'jest-canvas-mock'

describe("App", () => {
	test("renders well", () => {
		expect(() => render(<App />)).not.toThrowError();
	});
});
