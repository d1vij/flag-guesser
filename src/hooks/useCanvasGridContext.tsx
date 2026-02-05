import type { CellGrid, PropsWithChildren, StateSetterFunction } from "@/types";
import { createContext, useContext, useState } from "react";

type TColorGridContext = {
    grid: CellGrid[];
    dimensions: {
        height: number;
        width: number;
        cellSize: number;
    };
};

type PrivateContext = TColorGridContext & {
    setGrid: StateSetterFunction<CellGrid[]>;
};

const ColorGridContext = createContext<PrivateContext | null>(null);

type ProviderProps = PropsWithChildren & {
    height: number;
    width: number;
    cellSize: number;
};

export function ColorGridContextProvider({ children, height, width, cellSize }: ProviderProps) {
    const [grid, setGrid] = useState<CellGrid[]>(() =>
        Array.from({ length: height }, () => Array.from({ length: width }, () => "#FFFFFF")),
    );

    return (
        <ColorGridContext.Provider
            value={{
                grid,
                setGrid,
                dimensions: { height, width, cellSize },
            }}
        >
            {children}
        </ColorGridContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useColorGridContext() {
    const ctx = useContext(ColorGridContext);
    if (!ctx) {
        throw new Error("useColorGridContext must be used within ColorGridContextProvider");
    }

    const { grid, setGrid, dimensions } = ctx;

    function updateCellColor(row: number, col: number, color: string) {
        setGrid((prev) => {
            if (prev[row][col] === color) return prev;

            const next = prev.map((r) => [...r]);
            next[row][col] = color;
            return next;
        });
    }

    return { grid, dimensions, updateCellColor };
}
