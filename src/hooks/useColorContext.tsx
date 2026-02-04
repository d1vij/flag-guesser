import { createContext, useContext, useState } from "react";
import type { PropsWithChildren } from "@/types";
import isHexColorString from "@/lib/isHexColorString";

type TColorContext = {
    currentColor: string;
    setCurrentColor: (color: string) => void;
};
type ColorContextProviderProps = PropsWithChildren & {
    startingColor?: string;
};

const ColorContext = createContext<TColorContext | null>(null);

export function ColorContextProvider({ children, startingColor }: ColorContextProviderProps) {
    const [color, setColor] = useState<string>(startingColor || "#FF00FF");

    return <ColorContext value={{ currentColor: color, setCurrentColor: setColor }}>{children}</ColorContext>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useColorContext() {
    const ctx = useContext(ColorContext);

    if (ctx === null) {
        throw new Error("useColorContext can only be used inside a component enclosed in ColorContextProvider");
    }

    const { currentColor, setCurrentColor } = ctx;

    function colorSetter(color: string) {
        if (isHexColorString(color)) {
            setCurrentColor(color);
        } else {
            throw new Error(`${color} is not a valid hex color`);
        }
    }

    return { color: currentColor, setColor: colorSetter };
}
