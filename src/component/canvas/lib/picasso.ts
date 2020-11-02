import { Coordinate } from '../type';

type PicassoConstructorParam = Partial<Omit<Picasso, '_ctx' | 'clear' | 'drawLine'>>;

export default class Picasso {
    private _canvas: React.RefObject<HTMLCanvasElement> | null
    private _drawable: boolean;
    private _ctx: CanvasRenderingContext2D | null;
    private _strokeStyle: string;
    private _lineWidth: number;
    private _ratio: number;

    constructor({
        canvas = null,
        drawable = false,
        lineWidth = 1,
        strokeStyle = 'black',
    }: PicassoConstructorParam) {
        this._canvas = canvas;
        this._ctx = canvas?.current?.getContext('2d') || null;
        this._drawable = drawable;
        this._lineWidth = lineWidth;
        this._strokeStyle = strokeStyle;
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

    set strokeStyle(strokeStyle: string) {
        this._strokeStyle = strokeStyle;
    }

    set lineWidth(lineWidth: number) {
        this._lineWidth = lineWidth;
    }

    clear() {
        if (!this._canvas?.current || !this._ctx) throw new Error("canvas isn't initialized");
        this._ctx.clearRect(0, 0, this._canvas.current.width, this._canvas.current.height);
    }

    drawLine(start: Coordinate) {
        if (!this._drawable) return;
        if (!this._canvas || !this._ctx) throw new Error("canvas isn't initialized");
        console.log(start)
        this._ctx.beginPath();
        const radius = this._lineWidth * this._ratio / 2; // 반지름
        this._ctx.arc(start.x, start.y, radius, 0, Math.PI * 2);
        this._ctx.strokeStyle = this._strokeStyle;
        this._ctx.fill();
        this._ctx.closePath();
    }
}