import { useCallback, useEffect, useRef } from "react";
import { useColorGridContext } from "./useCanvasGridContext";
import { useColorContext } from "./useColorContext";

function getCellCoordinates(e: MouseEvent, rect: DOMRect, cellSize: number): { row: number; col: number } {
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    return {
        col: Math.floor(x / cellSize),
        row: Math.floor(y / cellSize),
    };
}

export function useCanvasLogic() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

    const { color } = useColorContext();
    const { grid, dimensions, updateCellColor } = useColorGridContext();

    const getContext = useCallback(() => {
        const canvas = canvasRef.current;
        const ctx = ctxRef.current;
        if (!canvas || !ctx) {
            throw new Error("Canvas context not initialized");
        }
        return { canvas, ctx };
    }, []);

    const drawGrid = useCallback(() => {
        const { ctx } = getContext();
        const { width, height, cellSize } = dimensions;

        ctx.clearRect(0, 0, width * cellSize, height * cellSize);

        for (let row = 0; row < height; row++) {
            for (let col = 0; col < width; col++) {
                ctx.fillStyle = grid[row][col];
                ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
            }
        }
    }, [getContext, grid, dimensions]);

    // Canvas setup
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const dpr = window.devicePixelRatio || 1;
        const { width, height, cellSize } = dimensions;

        const cssWidth = width * cellSize;
        const cssHeight = height * cellSize;

        canvas.style.width = `${cssWidth}px`;
        canvas.style.height = `${cssHeight}px`;

        canvas.width = Math.round(cssWidth * dpr);
        canvas.height = Math.round(cssHeight * dpr);

        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctxRef.current = ctx;
    }, [dimensions]);

    const handleClick = useCallback(
        (e: MouseEvent) => {
            const { canvas } = getContext();
            const { row, col } = getCellCoordinates(e, canvas.getBoundingClientRect(), dimensions.cellSize);

            if (row < 0 || col < 0 || row >= dimensions.height || col >= dimensions.width) {
                return;
            }

            updateCellColor(row, col, color);
        },
        [getContext, dimensions, updateCellColor, color],
    );

    const handleMouseMove = useCallback(
        (e: MouseEvent) => {
            const { canvas, ctx } = getContext();
            const { row, col } = getCellCoordinates(e, canvas.getBoundingClientRect(), dimensions.cellSize);

            if (row < 0 || col < 0 || row >= dimensions.height || col >= dimensions.width) {
                return;
            }
            console.log(e.buttons)
            if (e.buttons & 1) {
                console.log("e")
                handleClick(e);

                return;
            } else drawGrid();

            ctx.save();
            ctx.strokeStyle = "#000000";
            ctx.strokeRect(
                col * dimensions.cellSize,
                row * dimensions.cellSize,
                dimensions.cellSize,
                dimensions.cellSize,
            );
            ctx.restore();
        },
        [drawGrid, getContext, dimensions, handleClick],
    );

    useEffect(() => {
        const { canvas } = getContext();

        canvas.addEventListener("mousemove", handleMouseMove);
        canvas.addEventListener("click", handleClick);
        canvas.addEventListener("mouseleave", drawGrid);

        return () => {
            canvas.removeEventListener("mousemove", handleMouseMove);
            canvas.removeEventListener("click", handleClick);
            canvas.removeEventListener("mouseleave", drawGrid);
        };
    }, [getContext, handleMouseMove, handleClick, drawGrid]);

    useEffect(() => {
        drawGrid();
    }, [drawGrid]);

    return canvasRef;
}
