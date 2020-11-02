import { Coordinate } from '../type';

type PicassoConstructorParam = Partial<Omit<Picasso, '_ctx' | 'clear' | 'drawLine'>>;

export default class Picasso {
    private _canvas: React.RefObject<HTMLCanvasElement> | null
    private _drawable: boolean;
    private _ctx: CanvasRenderingContext2D | null;
    private _color: string;
    private _lineWidth: number;
    private _ratio: number;

    constructor({
        canvas = null,
        drawable = false,
        lineWidth = 5,
        color = 'black',
    }: PicassoConstructorParam) {
        this._canvas = canvas;
        this._ctx = canvas?.current?.getContext('2d') || null;
        this._drawable = drawable;
        this._lineWidth = lineWidth;
        this._color = color;
        this._ratio = window.devicePixelRatio || 1;
    }

    set canvas(canvas: React.RefObject<HTMLCanvasElement> | null) {
        this._canvas = canvas;
        this._ctx = canvas?.current?.getContext('2d') || null;
    }

    get canvas() {
        return this._canvas;
    }

    set drawable(drawable: boolean) {
        this._drawable = drawable;
    }

    set color(color: string) {
        this._color = color;
    }

    set lineWidth(lineWidth: number) {
        this._lineWidth = lineWidth;
    }

    clear() {
        if (!this._canvas?.current || !this._ctx) throw new Error("canvas isn't initialized");
        this._ctx.clearRect(0, 0, this._canvas.current.width, this._canvas.current.height);
    }

    drawPoint({ x, y }: Coordinate) {
        if (!this._drawable) return;
        if (!this._canvas || !this._ctx) throw new Error("canvas isn't initialized");
        this._ctx.beginPath();
        const radius = this._lineWidth * this._ratio / 2; // 반지름
        this._ctx.arc(x, y, radius, 0, Math.PI * 2);
        this._ctx.fillStyle = this._color;
        this._ctx.fill();
        this._ctx.closePath();
    }

    drawLine(start: Coordinate, end: Coordinate) {
        if (!this._drawable) return;
        if (!this._canvas || !this._ctx) throw new Error("canvas isn't initialized");
        const radius = this._lineWidth * this._ratio / 2; // 반지름
        const linewidth = this._lineWidth * this._ratio;

        this._ctx.lineWidth = linewidth;
        this._ctx.strokeStyle = this._color;
        this._ctx.fillStyle = this._color;

        this._ctx.beginPath();
        this._ctx.arc(start.x, start.y, radius, 0, Math.PI * 2);
        this._ctx.fill();
        this._ctx.closePath();

        this.drawMiddleLine(start, end);

        this._ctx.beginPath();
        this._ctx.arc(end.x, end.y, radius, 0, Math.PI * 2);
        this._ctx.fill();
        this._ctx.closePath();
    }

    drawMiddleLine(start: Coordinate, end: Coordinate) {
        if (!this._drawable) return;
        if (!this._canvas || !this._ctx) throw new Error("canvas isn't initialized");
        const linewidth = this._lineWidth * this._ratio;
        this._ctx.beginPath();
        this._ctx.moveTo(start.x, start.y);
        this._ctx.lineTo(end.x, end.y);
        this._ctx.strokeStyle = this._color;
        this._ctx.lineWidth = linewidth;
        this._ctx.stroke();
        this._ctx.closePath();
    }
}