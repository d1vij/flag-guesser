import C from "../lib/C";
import { useColorContext } from "../hooks/ColorContext";
import type { ValidColors } from "../lib/Colors";

type ColorPickerGridCellProps = {
    selfColor: ValidColors;
};

export default function ColorPickerGridCell({
    selfColor,
}: ColorPickerGridCellProps) {
    const { setColor } = useColorContext();
    function handleClick() {
        setColor(selfColor);
    }

    return (
        <button onClick={handleClick} type="button">
            <div className={C(selfColor, "size-20")}></div>
        </button>
    );
}
