import CanvasRootStore from './CanvasRootStore';
import { autorun, computed, observable, reaction } from "mobx";
import { Coordinate } from "../type";

const START: Coordinate = {
    x: 0,
    y: 0
}

export default class CanvasStore {
    private root: CanvasRootStore;
    private canvas: HTMLCanvasElement | null;
    private ctx: CanvasRenderingContext2D | null;

    @observable drawable: boolean;
    @observable color: string;
    @observable lineWidth: number;
    private ratio: number;

    @observable private undoStack: ImageData[];
    @observable private redoStack: ImageData[];

    constructor(root: CanvasRootStore) {
        this.root = root;
        this.canvas = null;
        this.ctx = null;
        this.drawable = false;
        this.lineWidth = 1;
        this.color = '#000000';
        this.ratio = window.devicePixelRatio || 1;
        this.undoStack = [];
        this.redoStack = [];
    }

    private get currentContext() {
        if (!this.canvas || !this.ctx) throw new Error("canvas isn't initialized");
        const width = this.canvas.width;
        const height = this.canvas.height;
        const imageData = this.ctx.getImageData(0, 0, width, height);
        return imageData;
    }

    private get radius() {
        return this.lineWidth / 2;
    }

    @computed
    get undoAvailable() {
        return this.undoStack.length > 0;
    }

    @computed
    get redoAvailable() {
        return this.redoStack.length > 0;
    }

    get frame() {
        if (!this.canvas) throw new Error("canvas isn't initialized");
        const frame = this.canvas.toDataURL();
        return frame;
    }

    get frameIdx() {
        return this.root.galleryStore.frameIdx;
    }

    changeCanvas(canvas: React.RefObject<HTMLCanvasElement>) {
        if (!canvas.current) throw new Error("canvas가 올바르지 않은 값으로 초기화되었습니다.");
        this.canvas = canvas.current;
        this.ctx = canvas.current.getContext("2d");
        this.loadFrame();
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

    drawImage(imageSrc: string) {
        if (!this.canvas || !this.ctx) throw new Error("canvas isn't initialized");
        if (!imageSrc) {
            console.warn('image src가 올바르지 않습니다.');
            return;
        }
        const img = new Image();
        img.onload = () => {
            this.ctx!.drawImage(img, 0, 0);
        }
        img.src = imageSrc;
    }

    onDrawEnd() {
        if (!this.canvas || !this.ctx) throw new Error("canvas isn't initialized");
        this.drawable = false;
        this.saveCanvas();
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
        const { width, height } = this.canvas;
        this.ctx.clearRect(0, 0, width, height);
        this.clearRedoStack();
    }

    clearRedoStack() {
        this.redoStack.length = 0;
    }

    saveCanvas() {
        if (this.frameIdx === null) {
            console.error('frameIdx가 null입니다.');
            return;
        }
        this.root.galleryStore.saveFrame(this.frameIdx, this.frame);
    }

    loadFrame() {
        if (this.frameIdx === null) return;
        this.root.canvasStore.drawImage(this.root.galleryStore.frames[this.frameIdx])
    }
}