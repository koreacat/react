import Picasso from "../picasso";
import { coordinate } from '../../fixtures/coordinate';
import 'jest-canvas-mock'

describe('picasso', () => {
    let canvas: HTMLCanvasElement;
    let ctx: CanvasRenderingContext2D;

    beforeAll(() => {
        canvas = document.createElement('canvas');
        ctx = canvas.getContext('2d')!;
    })

    describe('clearCanvas', () => {
        test('throws error when canvas is wrong value', () => {
            expect(() => Picasso.clearCanvas(null, ctx)).toThrowError("canvas is wrong value")
        })

        test('throws error when ctx is wrong value', () => {
            expect(() => Picasso.clearCanvas(canvas, null)).toThrowError("ctx is wrong value")
        })
    })

    describe('drawPoint', () => {
        test('throws error when ctx is wrong value', () => {
            expect(() => Picasso.drawPoint(null, ctx)).toThrowError("ctx is wrong value")
        })
    })

    describe('drawRoundLine', () => {
        test('throws error when ctx is wrong value', () => {
            expect(() => Picasso.drawRoundLine(null, ctx)).toThrowError("ctx is wrong value")
        })
    })

    describe('drawFlatLine', () => {
        test('throws error when ctx is wrong value', () => {
            expect(() => Picasso.drawFlatLine(null, ctx)).toThrowError("ctx is wrong value")
        })
    })

    describe('getCanvasImageData', () => {
        test('throws error when canvas is wrong value', () => {
            expect(() => Picasso.getCanvasImageData(null, ctx)).toThrowError("canvas is wrong value")
        })

        test('throws error when ctx is wrong value', () => {
            expect(() => Picasso.getCanvasImageData(canvas, null)).toThrowError("ctx is wrong value")
        })
    })
})