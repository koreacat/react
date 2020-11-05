import { useState } from 'react';
import Picasso from "../service/picasso";

export function usePicasso(color?: string, lineWidth?: number) {
    const [picasso] = useState(new Picasso({
        color,
        lineWidth,
    }));
    return [picasso];
}