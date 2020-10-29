import { useState, useEffect, useRef, useCallback } from 'react';
import Picasso from "../lib/picasso";

export function useCanvas () {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>();

    useEffect(() => {
		setCtx(canvasRef.current?.getContext("2d"));
    }, [canvasRef]);
    
    return [canvasRef, ctx] as const;
}

export function usePicasso (ctx?: CanvasRenderingContext2D | null) {
    const [picasso, setPiccaso] = useState<Picasso | undefined | null>(ctx && new Picasso(ctx));
    useEffect(() => {
        if(ctx) setPiccaso(new Picasso(ctx))
    }, [ctx])
    return [picasso];
}