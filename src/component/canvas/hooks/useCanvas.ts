import { useState } from 'react';
import Picasso from "../lib/picasso";

export function usePicasso (strokeStyle = 'black', lineWidth = 1, ref: React.RefObject<HTMLCanvasElement> | null) {
    const [picasso] = useState(new Picasso(strokeStyle, lineWidth, ref));
    return [picasso];
}