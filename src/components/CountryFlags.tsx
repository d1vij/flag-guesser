import { useState } from "react";
import { ColorContext } from "../hooks/ColorContext";
import { type ValidColors, Colors } from "../lib/Colors";
import ColorPicker from "./ColorPicker";

// type ValidColors = typeof colors[number]


export default function CountryFlag() {
    const [color, setColor] = useState<ValidColors>(Colors.WHITE);
    return (
        <div>
            <ColorContext value={{ color, setColor }}>


                <ColorPicker colors={Object.values(Colors)}/>
            </ColorContext>
        </div>
    );
}
