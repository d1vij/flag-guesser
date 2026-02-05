export type CanvasProps = {
    height: number;
    width: number;
};

export type CanvasCellProps = {
    index: number;
    color: string;
    onClick: (at: number) => void;
    isMouseDown: boolean;
};
