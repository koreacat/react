import { useState, useEffect, useRef } from 'react';
import Picasso from "../lib/picasso";

export function useCanvas () {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);

    useEffect(() => {
		setCtx(canvasRef.current!.getContext("2d"));
    }, [canvasRef]);
    
    return [canvasRef, ctx] as const;
}

export function usePicasso (strokeStyle = 'black', lineWidth = 1, ctx: CanvasRenderingContext2D | null) {
    const [picasso] = useState(new Picasso(strokeStyle, lineWidth, ctx));
    return [picasso];
}