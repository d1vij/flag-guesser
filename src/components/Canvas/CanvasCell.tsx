import type { CanvasCellProps } from "./types";

export default function CanvasCell({ color, onClick, index, isMouseDown }: CanvasCellProps) {
    function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
        onClick(index);
    }

    function handleDrag(e: React.DragEvent<HTMLButtonElement>) {
        if (isMouseDown) {
            onClick(index);
        }
    }

    return (
        <button
            type="button"
            onClick={handleClick}
            onMouseEnter={handleDrag}
            style={{
                backgroundColor: color,
            }}
            className="cursor-pointer hover:border border-solid border-black"
        ></button>
    );
}
