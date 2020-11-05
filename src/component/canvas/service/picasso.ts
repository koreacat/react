import { Coordinate } from '../type';

type PicassoConstructorParam = Partial<Omit<Picasso, '_ctx' | 'clear' | 'drawLine'>>;

export default class Picasso {
    private _canvas: React.RefObject<HTMLCanvasElement> | null;
    private _ctx: CanvasRenderingContext2D | null;

    private _drawable: boolean;
    private _color: string;
    private _lineWidth: number;
    private _ratio: number;

    private _undoStack: ImageData[] = [];
    private _redoStack: ImageData[] = [];

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

    get undoStack() {
        return this._undoStack;
    }

    get redoStack() {
        return this._redoStack;
    }

    clearCanvas() {
        if (!this._canvas?.current || !this._ctx) throw new Error("canvas isn't initialized");

        this.drawStart();
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

    private drawMiddleLine(start: Coordinate, end: Coordinate) {
        if (!this._drawable) return;
        if (!this._canvas || !this._ctx) throw new Error("canvas isn't initialized");

        const linewidth = this._lineWidth * this._ratio;
        this._ctx.strokeStyle = this._color;
        this._ctx.lineWidth = linewidth;

        this._ctx.beginPath();
        this._ctx.moveTo(start.x, start.y);
        this._ctx.lineTo(end.x, end.y);
        this._ctx.stroke();
        this._ctx.closePath();
    }

    undo() {
        if (!this._canvas || !this._ctx) throw new Error("canvas isn't initialized");
        if (this._undoStack.length === 0) {
            console.warn('undoStack이 비어있습니다.');
            return;
        }

        this.pushCanvasToRedoStack();
        const image = this._undoStack.pop()!;
        this._ctx.putImageData(image, 0, 0);
    }

    redo() {
        if (!this._canvas || !this._ctx) throw new Error("canvas isn't initialized");
        if (this._redoStack.length === 0) {
            console.warn('redoStack이 비어있습니다.');
            return;
        }

        this.pushCanvasToUndoStack();
        const image = this._redoStack.pop()!;
        this._ctx.putImageData(image, 0, 0);
    }

    getImageData() {
        if (!this._canvas || !this._ctx) throw new Error("canvas isn't initialized");
        const width = this._canvas.current!.width;
        const height = this._canvas.current!.height;
        const imageData = this._ctx.getImageData(0, 0, width, height);
        return imageData;
    }

    drawStart() {
        this.clearRedoStack();
        this.pushCanvasToUndoStack();
    }

    pushCanvasToUndoStack() {
        const image = this.getImageData();
        this._undoStack.push(image);
    }

    private pushCanvasToRedoStack() {
        const image = this.getImageData();
        this._redoStack.push(image);
    }

    clearUndoStack() {
        this._undoStack = [];
    }

    clearRedoStack() {
        this._redoStack = [];
    }
}