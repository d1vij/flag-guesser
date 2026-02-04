import DebugPanel from "../DebugPanel/DebugPanel";
import { ColorGridContextProvider } from "@/hooks/useCanvasGridContext";
import { ColorContextProvider } from "@/hooks/useColorContext";

import CanvasElement from "./CanvasElement";
import ColorPicker from "./ColorPicker";
import type { CanvasProps } from "./types";

export default function Canvas({ height, width }: CanvasProps) {
    return (
        <ColorContextProvider>
            <ColorGridContextProvider height={height} width={width}>
                <CanvasElement />
                <ColorPicker />

                <DebugPanel />
            </ColorGridContextProvider>
        </ColorContextProvider>
    );
}
