import CanvasStore from '../CanvasStore';
import { getCanvasRef } from '../../fixtures/canvas';
import 'jest-canvas-mock'

describe('canvas store', () => {
    let store: CanvasStore;
    beforeEach(() => {
        store = new CanvasStore({});
    })

    describe('changes by state changers', () => {
        test('chages canvas', () => {
            const canvasRef = getCanvasRef();
            expect(() => store.changeCanvas(canvasRef)).not.toThrow();
        })
        test('chages drawable', () => {
            expect(store.drawable).toBe(false);
            store.changeDrawable(true);
            expect(store.drawable).toBe(true);
        })
        test('chages color', () => {
            expect(store.color).toBe('#000000');
            store.changeColor('#f0f0f0');
            expect(store.color).toBe('#f0f0f0');
        })
        test('chages lineWidth', () => {
            expect(store.lineWidth).toBe(1);
            store.changeLineWidth(2);
            expect(store.lineWidth).toBe(2);
        })
    })

    describe('methods need canvas', () => {
        beforeEach(() => {
            const canvasRef = getCanvasRef();
            store.changeCanvas(canvasRef);
        })

        describe('onDrawStart', () => {
            test('drawable become true', () => {
                store.onDrawStart()
                expect(store.drawable).toBe(true);
            })

            test('undoAvailable become true', () => {
                expect(store.undoAvailable).toBe(false);
                store.onDrawStart()
                expect(store.undoAvailable).toBe(true);
            })
        })

        describe('onDrawEnd', () => {
            test('drawable become false', () => {
                store.onDrawStart()
                store.onDrawEnd()
                expect(store.drawable).toBe(false);
            })
        })

        describe('undo', () => {
            test('undoAvailable become true after onDrawStart', () => {
                expect(store.undoAvailable).toBe(false);
                store.onDrawStart()
                expect(store.undoAvailable).toBe(true);
            })

            test('undoAvailable become true after clearCanvas', () => {
                expect(store.undoAvailable).toBe(false);
                store.clearCanvas()
                expect(store.undoAvailable).toBe(true);
            })

            test('undoAvailable becom false after all undo stack elements pop', () => {
                store.onDrawStart()
                store.undo();
                expect(store.undoAvailable).toBe(false);
            })

            test('undo returns false when undo is unavailable', () => {
                expect(store.undoAvailable).toBe(false);
                expect(store.undo()).toBe(false);
                expect(store.undoAvailable).toBe(false);
            })

            test('undo returns true when undo is available', () => {
                store.onDrawStart()
                expect(store.undoAvailable).toBe(true);
                expect(store.undo()).toBe(true);
            })
        })

        describe('redo', () => {
            test('redoAvailable become true after undo', () => {
                expect(store.redoAvailable).toBe(false);
                store.onDrawStart();
                store.undo()
                expect(store.redoAvailable).toBe(true);
            })

            test('redoAvailable become false after all undo stack elements pop', () => {
                expect(store.redoAvailable).toBe(false);
                store.onDrawStart();
                store.undo()
                store.redo()
                expect(store.redoAvailable).toBe(false);
            })

            test('redoAvailable become false after onDrawStart', () => {
                store.onDrawStart()
                store.undo();
                store.onDrawStart()
                expect(store.redoAvailable).toBe(false);
            })

            test('redoAvailable become false after clearCanvas', () => {
                store.onDrawStart()
                store.undo();
                store.clearCanvas()
                expect(store.redoAvailable).toBe(false);
            })

            test('redo returns false when redo is unavailable', () => {
                expect(store.redoAvailable).toBe(false);
                expect(store.redo()).toBe(false);
            })

            test('redo returns true when redo is available', () => {
                store.onDrawStart()
                store.undo();
                expect(store.redoAvailable).toBe(true);
                expect(store.redo()).toBe(true);
            })
        })
    })
})