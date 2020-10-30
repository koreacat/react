import { Coordinate } from '../type';

export default class Picasso {
    private _ctx: CanvasRenderingContext2D | null;
    private _strokeStyle: string;
    private _lineWidth: number;
    private _ratio: number;

    constructor(strokeStyle = 'black', lineWidth = 1, ctx: CanvasRenderingContext2D | null) {
        this._ctx = ctx;
        this._strokeStyle = strokeStyle;
        this._lineWidth = lineWidth;
        this._ratio = window.devicePixelRatio || 1;
    }

    set ctx(ctx: CanvasRenderingContext2D) {
        if(!ctx) throw Error("ctx should be context object");
        this._ctx = ctx;
    }

    set strokeStyle(strokeStyle: string) {
        this._strokeStyle = strokeStyle;
    }

    set lineWidth(lineWidth: number) {
        this._lineWidth = lineWidth;
    }

    clear() { }

    drawLine(start: Coordinate, end: Coordinate) {
        if(!this._ctx) throw new Error("ctx doesn't initialized");
        this._ctx.beginPath();
        this._ctx.moveTo(start.x, start.y);
        this._ctx.lineTo(end.x, end.y);
        this._ctx.strokeStyle = this._strokeStyle;
        this._ctx.lineWidth = this._lineWidth * this._ratio;
        this._ctx.stroke();
        this._ctx.closePath();
    }
}