export const Colors = {
    WHITE: "bg-white",
    BLACK: "bg-black",
    BLUE: "bg-blue-300",
    RED: "bg-red-300",
    YELLOW: "bg-yellow-300",
    GREEN: "bg-green-300",
} as const;
export type ValidColors = (typeof Colors)[keyof typeof Colors];
