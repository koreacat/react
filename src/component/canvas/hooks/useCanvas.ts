import { useState } from 'react';
import Picasso from "../lib/picasso";

export function usePicasso(strokeStyle = 'black', lineWidth = 1, canvas: React.RefObject<HTMLCanvasElement> | null) {
    const [picasso] = useState(new Picasso({
        strokeStyle, lineWidth, canvas
    }));
    return [picasso];
}