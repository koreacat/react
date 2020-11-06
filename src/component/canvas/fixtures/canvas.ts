export const getCanvasRef = () => {
    const canvas = document.createElement('canvas');
    const canvasRef = { current: canvas };
    return canvasRef;
}
