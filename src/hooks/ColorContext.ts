import { createContext, useContext } from "react";
import type { ValidColors } from "./components/CountryFlags";

type ColorContextType = {
    color: ValidColors | null;
    setColor: React.Dispatch<React.SetStateAction<ValidColors>> | null;
};

export const ColorContext = createContext<ColorContextType>({
    color: null,
    setColor: null,
});

export function useColorContext() {
    const { color, setColor } = useContext(ColorContext);
    if (setColor === null || color === null) {
        throw new Error("No color context defined at any parent level");
    }

    return { color, setColor };
}
