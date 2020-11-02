import { useState } from 'react';
import Picasso from "../lib/picasso";

export function usePicasso(color?: string, lineWidth?: number, canvas?: React.RefObject<HTMLCanvasElement> | null) {
    const [picasso] = useState(new Picasso({
        color,
        lineWidth,
        canvas
    }));
    return [picasso];
}