import type { CellGrid, PropsWithChildren, StateSetterFunction } from "@/types";
import { createContext, useContext, useState } from "react";


type TColorGridContext = {
    grid: CellGrid;
    dimensions: {
        height: number;
        width: number;
    };
};

type PVT_TColorGridContext = TColorGridContext & {
    setGrid: StateSetterFunction<CellGrid>;
};

const ColorGridContext = createContext<PVT_TColorGridContext | null>(null);

type ColorGridContextProviderProps = PropsWithChildren & {
    height: number;
    width: number;
};

export function ColorGridContextProvider({ children, height, width }: ColorGridContextProviderProps) {
    const [grid, setGrid] = useState<CellGrid>(() => {
        return new Array(height * width).fill("#FFFFFF");
    });

    return (
        <ColorGridContext
            value={{
                grid,
                setGrid,
                dimensions: { height, width },
            }}
        >
            {children}
        </ColorGridContext>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useColorGridContext() {
    const ctx = useContext(ColorGridContext);
    if (ctx === null) {
        throw new Error("useColorGridContext can only be used within a ColorGridContextProvider");
    }

    const { setGrid, dimensions, grid } = ctx;

    function updateCellColor(at: number, color: string) {
        setGrid((c) => {
            return c.map((oldColor, idx) => (idx === at ? color : oldColor));
        });
    }

    return { grid, dimensions, updateCellColor };
}
