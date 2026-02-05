import { useColorGridContext } from "@/hooks/useCanvasGridContext";
import { useCanvasLogic } from "@/hooks/useCanvasLogic";

export default function CanvasElement() {
    const ref = useCanvasLogic();
    const { dimensions } = useColorGridContext();
    return (
        <canvas
            ref={ref}
            className="border border-black m-10 cursor-crosshair bg-red-200"
            style={{
                height: `${dimensions.height * dimensions.cellSize}px`,
                width: `${dimensions.width * dimensions.cellSize}px`,
            }}
        ></canvas>
    );
}
