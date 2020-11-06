import { computed, observable } from "mobx";
import { Coordinate } from "../type";

type CanvasStoreParam = Partial<{
    canvas: React.RefObject<HTMLCanvasElement> | null;
    drawable: boolean;
    color: string;
    lineWidth: number;
}>

const START: Coordinate = {
    x: 0,
    y: 0
}

export default class CanvasStore {
    private canvas: React.RefObject<HTMLCanvasElement> | null;
    private ctx: CanvasRenderingContext2D | null;

    @observable drawable: boolean;
    @observable color: string;
    @observable lineWidth: number;
    private ratio: number;

    @observable private undoStack: ImageData[];
    @observable private redoStack: ImageData[];

    constructor({
        canvas = null,
        drawable = false,
        lineWidth = 1,
        color = '#000000',
    }: CanvasStoreParam) {
        this.canvas = canvas;
        this.ctx = canvas?.current?.getContext('2d') || null;
        this.drawable = drawable;
        this.lineWidth = lineWidth;
        this.color = color;
        this.ratio = window.devicePixelRatio || 1;
        this.undoStack = [];
        this.redoStack = [];
    }

    private get currentContext() {
        if (!this.canvas || !this.ctx) throw new Error("canvas isn't initialized");
        const width = this.canvas.current!.width;
        const height = this.canvas.current!.height;
        const imageData = this.ctx.getImageData(0, 0, width, height);
        return imageData;
    }

    private get radius() {
        return this.lineWidth / 2;
    }

    @computed get undoAvailable() {
        return this.undoStack.length > 0;
    }

    @computed get redoAvailable() {
        return this.redoStack.length > 0;
    }

    changeCanvas(canvas: React.RefObject<HTMLCanvasElement>) {
        if (!canvas?.current) throw new Error("canvas가 올바르지 않은 값으로 초기화되었습니다.");
        this.canvas = canvas;
        this.ctx = canvas.current.getContext("2d");
    }

    changeDrawable(drawable: boolean) {
        this.drawable = drawable;
    }

    changeColor(color: string) {
        this.color = color;
    }

    changeLineWidth(lineWidth: number) {
        this.lineWidth = lineWidth;
    }

    onDrawStart() {
        if (!this.canvas || !this.ctx) throw new Error("canvas isn't initialized");
        this.undoStack.push(this.currentContext);
        this.drawable = true;
        this.clearRedoStack();
    }

    drawPoint({ x, y }: Coordinate) {
        if (!this.drawable) return;
        if (!this.canvas || !this.ctx) throw new Error("canvas isn't initialized");

        this.ctx.beginPath();
        const radius = this.radius * this.ratio;
        this.ctx.arc(x, y, radius, 0, Math.PI * 2);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
        this.ctx.closePath();
    }

    drawLine(start: Coordinate, end: Coordinate) {
        if (!this.drawable) return;
        if (!this.canvas || !this.ctx) throw new Error("canvas isn't initialized");

        const radius = this.radius * this.ratio;
        const linewidth = this.lineWidth * this.ratio;
        this.ctx.lineWidth = linewidth;
        this.ctx.fillStyle = this.color;

        this.ctx.beginPath();
        this.ctx.arc(start.x, start.y, radius, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.closePath();

        this.drawMiddleLine(start, end);

        this.ctx.beginPath();
        this.ctx.arc(end.x, end.y, radius, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.closePath();
    }

    private drawMiddleLine(start: Coordinate, end: Coordinate) {
        if (!this.drawable) return;
        if (!this.canvas || !this.ctx) throw new Error("canvas isn't initialized");

        const linewidth = this.lineWidth * this.ratio;
        this.ctx.strokeStyle = this.color;
        this.ctx.lineWidth = linewidth;

        this.ctx.beginPath();
        this.ctx.moveTo(start.x, start.y);
        this.ctx.lineTo(end.x, end.y);
        this.ctx.stroke();
        this.ctx.closePath();
    }

    drawImageData(imageData: ImageData, { x, y }: Coordinate) {
        if (!this.canvas || !this.ctx) throw new Error("canvas isn't initialized");
        this.ctx.putImageData(imageData, x, y);
    }

    onDrawEnd() {
        if (!this.canvas || !this.ctx) throw new Error("canvas isn't initialized");
        this.drawable = false;
    }

    undo(): boolean {
        if (!this.canvas || !this.ctx) throw new Error("canvas isn't initialized");
        if (this.undoStack.length === 0) {
            console.warn('undoStack이 비어있습니다.');
            return false;
        }
        this.redoStack.push(this.currentContext);
        const nextContext = this.undoStack.pop()!;
        this.drawImageData(nextContext, START);
        return true;
    }

    redo(): boolean {
        if (!this.canvas || !this.ctx) throw new Error("canvas isn't initialized");
        if (this.redoStack.length === 0) {
            console.warn('redoStack이 비어있습니다.');
            return false;
        }
        this.undoStack.push(this.currentContext);
        const nextContext = this.redoStack.pop()!;
        this.drawImageData(nextContext, START);
        return true;
    }

    clearCanvas() {
        if (!this.canvas || !this.ctx) throw new Error("canvas isn't initialized");
        this.undoStack.push(this.currentContext);
        const { width, height } = this.canvas.current!;
        this.ctx.clearRect(0, 0, width, height);
        this.clearRedoStack();
    }

    clearRedoStack() {
        this.redoStack.length = 0;
    }
}