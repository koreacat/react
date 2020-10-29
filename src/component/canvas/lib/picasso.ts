import { Coordinate } from '../type';

export default class Picasso {
    ctx: CanvasRenderingContext2D;
    strokeStyle: string;
    lineWidth: number;
    ratio: number;

    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
        this.strokeStyle = 'black';
        this.lineWidth = 1;
        this.ratio = 1; //devicePixelRatio
    }

    clear() { }

    drawLine(start: Coordinate, end: Coordinate) {
        console.log(start, end);
        this.ctx.beginPath();
        this.ctx.moveTo(start.x, start.y);
        this.ctx.lineTo(end.x, end.y);
        this.ctx.strokeStyle = this.strokeStyle;
        this.ctx.lineWidth = this.lineWidth;
        this.ctx.stroke();
        this.ctx.closePath();
    }
}