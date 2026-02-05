import { ColorContextProvider } from "@/hooks/useColorContext";
import type { CanvasProps } from "./types";
import { ColorGridContextProvider } from "@/hooks/useCanvasGridContext";
import ColorPicker from "../ColorPicker";
import DebugPanel from "../DebugPanel/DebugPanel";
import CanvasElement from "./CanvasElement";

export default function Canvas({ height, width, cellSize }: CanvasProps) {
    return (
        <ColorContextProvider>
            <ColorGridContextProvider height={height} width={width} cellSize={cellSize}>
                <CanvasElement />
                <ColorPicker />
                <DebugPanel />
            </ColorGridContextProvider>
        </ColorContextProvider>
    );
}
