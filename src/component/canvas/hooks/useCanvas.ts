import { useState, useEffect, useRef } from 'react';

export function useCanvas () {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>();

    useEffect(() => {
		setCtx(canvasRef.current?.getContext("2d"));
    }, [canvasRef]);
    
    return [canvasRef, ctx] as const;
}