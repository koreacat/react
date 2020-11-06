import { Coordinate } from '../type';

export default class Picasso {
    static clearCanvas(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        if (!canvas) throw new Error("canvas is wrong value");
        if (!ctx) throw new Error("ctx is wrong value");
        const { width, height } = canvas;
        ctx.clearRect(0, 0, width, height);
    }

    static drawPoint(ctx: CanvasRenderingContext2D, { x, y }: Coordinate, color: string, lineWidth: number, ratio: number) {
        if (!ctx) throw new Error("ctx is wrong value");

        const radius = lineWidth * ratio / 2; // 반지름
        ctx.fillStyle = color;

        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    }

    static drawRoundLine(ctx: CanvasRenderingContext2D, start: Coordinate, end: Coordinate, color: string, lineWidth: number, ratio: number) {
        if (!ctx) throw new Error("ctx is wrong value");

        const linewidth = lineWidth * ratio;
        ctx.lineWidth = linewidth;
        ctx.fillStyle = color;

        this.drawPoint(ctx, start, color, linewidth, ratio);
        this.drawFlatLine(ctx, start, end, color, linewidth, ratio);
        this.drawPoint(ctx, end, color, linewidth, ratio);
    }

    static drawFlatLine(ctx: CanvasRenderingContext2D, start: Coordinate, end: Coordinate, color: string, lineWidth: number, ratio: number) {
        if (!ctx) throw new Error("ctx is wrong value");

        const linewidth = lineWidth * ratio;
        ctx.strokeStyle = color;
        ctx.lineWidth = linewidth;

        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        ctx.stroke();
        ctx.closePath();
    }

    static getCanvasImageData(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        if (!canvas) throw new Error("canvas is wrong value");
        if (!ctx) throw new Error("ctx is wrong value");

        const { width, height } = canvas;
        const imageData = ctx.getImageData(0, 0, width, height);
        return imageData;
    }
}