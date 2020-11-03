import { useCallback, useEffect, useRef, useState } from "react";

export function usePressed<E extends HTMLElement>() {
    const ref = useRef<E>(null);
    const [pressed, setPressed] = useState(false);
    const handlePressDown = useCallback(() => {
        setPressed(true);
    }, [setPressed]);
    const handlePressUp = useCallback(() => {
        setPressed(false);
    }, [setPressed]);

    useEffect(() => {
        if (!ref || !ref.current) return;

        ref.current.addEventListener("mousedown", handlePressDown);
        ref.current.addEventListener("mouseup", handlePressUp);
        ref.current.addEventListener("touchstart", handlePressDown);
        ref.current.addEventListener("touchend", handlePressUp);

        return () => {
            ref.current!.removeEventListener("mousedown", handlePressDown);
            ref.current!.removeEventListener("mouseup", handlePressUp);
            ref.current!.removeEventListener("touchstart", handlePressDown);
            ref.current!.removeEventListener("touchend", handlePressUp);
        }
    }, [ref, handlePressDown, handlePressUp]);

    return [ref, pressed] as const;
} 