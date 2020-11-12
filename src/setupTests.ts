// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';
import LocalStorageMock from './component/canvas/fixtures/mock/LocalStorageMock';

// @ts-ignore
global.localStorage = new LocalStorageMock();