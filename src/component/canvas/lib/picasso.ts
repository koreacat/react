import { Coordinate } from '../type';

export default class Picasso {
    private _ctx: CanvasRenderingContext2D;
    private _strokeStyle: string;
    private _lineWidth: number;
    private _ratio: number;

    constructor(ctx: CanvasRenderingContext2D) {
        this._ctx = ctx;
        this._strokeStyle = 'black';
        this._lineWidth = 1;
        this._ratio = 1; //devicePixelRatio
    }

    set strokeStyle(strokeStyle: string) {
        this._strokeStyle = strokeStyle;
    }

    set lineWidth(lineWidth: number) {
        this._lineWidth = lineWidth;
    }

    set ratio(ratio: number) {
        this._ratio = ratio;
    }

    clear() { }

    drawLine(start: Coordinate, end: Coordinate) {
        this._ctx.beginPath();
        this._ctx.moveTo(start.x, start.y);
        this._ctx.lineTo(end.x, end.y);
        this._ctx.strokeStyle = this._strokeStyle;
        this._ctx.lineWidth = this._lineWidth;
        this._ctx.stroke();
        this._ctx.closePath();
    }
}