import { useState } from "react";
import { nanoid } from "nanoid";
import { useColorGridContext } from "@/hooks/useCanvasGridContext";
import { useColorContext } from "@/hooks/useColorContext";
import CanvasCell from "./CanvasCell";

export default function CanvasElement() {
    const { grid, updateCellColor, dimensions } = useColorGridContext();
    const { color } = useColorContext();

    const [mouseDown, setMouseDown] = useState(false);

    function handleGridCellClick(at: number) {
        updateCellColor(at, color);
    }

    const gridElms = grid.map((c, idx) => (
        <CanvasCell key={nanoid()} color={c} index={idx} onClick={handleGridCellClick} isMouseDown={mouseDown} />
    ));

    return (
        // biome-ignore lint/a11y/noStaticElementInteractions: <xplanation>
        <div
            onMouseDown={() => setMouseDown(true)}
            onMouseUp={() => setMouseDown(false)}
            onMouseLeave={() => setMouseDown(false)}
            className="bg-red-300 grid p-1"
            style={{
                gridTemplateRows: `repeat(${dimensions.height}, 1fr)`,
                gridTemplateColumns: `repeat(${dimensions.width}, 1fr)`,
                height: `calc(${dimensions.height} * 1em)`,
                width: `calc(${dimensions.width} * 1em)`,
            }}
        >
            {gridElms}
        </div>
    );
}
