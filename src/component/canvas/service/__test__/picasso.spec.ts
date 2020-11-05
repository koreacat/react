import Picasso from "../picasso";
import { coordinate } from '../../fixtures/coordinate';
import 'jest-canvas-mock'

describe('picasso', () => {
    let picasso: Picasso = null;

    describe('canvas', () => {
        beforeAll(() => {
            picasso = new Picasso({ drawable: true });
        })

        test('should initialized', () => {
            expect(() => picasso.clearCanvas()).toThrow("canvas isn't initialized")
            expect(() => picasso.drawPoint(coordinate)).toThrowError("canvas isn't initialized")
            expect(() => picasso.drawLine(coordinate, coordinate)).toThrowError("canvas isn't initialized")
        })

    })

    describe('save', () => {
        beforeAll(() => {
            const canvas = document.createElement('canvas');
            const canvasRef = { current: canvas }
            picasso = new Picasso({ canvas: canvasRef, drawable: true });
        })

        test('undo stack was pushed after pushCanvasToUndoStack', () => {
            picasso.drawStart();
            expect(picasso.undoStack.length).toBe(1);
        })
    })

    describe('undo', () => {
        beforeAll(() => {
            const canvas = document.createElement('canvas');
            const canvasRef = { current: canvas }
            picasso = new Picasso({ canvas: canvasRef, drawable: true });
        })

        beforeEach(() => {
            picasso.clearUndoStack();
            picasso.clearRedoStack();
        })

        test('is empty at first', () => {
            expect(picasso.undoStack.length).toBe(0);
        })

        test('undo stack was pushed after pushCanvasToUndoStack', () => {
            picasso.drawStart();
            expect(picasso.undoStack.length).toBe(1);
        })

    })

    describe('redo', () => {
        beforeAll(() => {
            const canvas = document.createElement('canvas');
            const canvasRef = { current: canvas }
            picasso = new Picasso({ canvas: canvasRef, drawable: true });
        })

        beforeEach(() => {
            picasso.clearRedoStack();
            picasso.clearUndoStack();
        })

        test('redo stack is empty at first', () => {
            expect(picasso.redoStack.length).toBe(0);
        })

        test('should increase after undo', () => {
            picasso.drawStart();
            picasso.undo();
            expect(picasso.redoStack.length).toBe(1);
        })

        test('undo stack should be increased after redo', () => {
            picasso.drawStart();
            picasso.undo();
            picasso.redo();
            expect(picasso.undoStack.length).toBe(1);
        })

        test('redo stack should be cleared after drawStart', () => {
            picasso.drawStart();
            picasso.undo();
            expect(picasso.redoStack.length).toBe(1);
            picasso.drawStart();
            expect(picasso.redoStack.length).toBe(0);
        })

        test('redo stack should be decreased after redo', () => {
            picasso.drawStart();
            picasso.undo();
            picasso.redo();
            expect(picasso.redoStack.length).toBe(0);
        })
    })
})