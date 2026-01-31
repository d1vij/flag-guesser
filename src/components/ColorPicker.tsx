import ColorPickerGridCell from "./ColorPickerGridCell";
import type { ValidColors } from "../lib/Colors";

type ColorPickerProps = {
    colors: ValidColors[];
};

export default function ColorPicker({ colors }: ColorPickerProps) {
    const elms = colors.map((c) => (
        <ColorPickerGridCell selfColor={c} key={c} />
    ));

    return (
        <div className="flex">
            {elms}
        </div>
    )
}
