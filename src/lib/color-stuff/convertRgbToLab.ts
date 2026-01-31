import type { RGBColorArray, LabColorArray } from "./types";

export function convertRgbToLab(
    colorArray: RGBColorArray,
    decimalPrecision: number = 2,
): LabColorArray {
    // normalize
    colorArray = [
        colorArray[0] / 255,
        colorArray[1] / 255,
        colorArray[2] / 255,
    ];

    for (let i = 0; i < 3; i++) {
        // biome-ignore lint/style/noNonNullAssertion: fixed array size
        const c = colorArray[i]!;
        colorArray[i] = c > 0.04045 ? ((c + 0.055) / 1.055) ** 2.4 : c / 12.92;
    }

    const xyz: RGBColorArray = [
        0.4124564 * colorArray[0] +
            0.3575761 * colorArray[1] +
            0.1804375 * colorArray[2],
        0.2126729 * colorArray[0] +
            0.7151522 * colorArray[1] +
            0.072175 * colorArray[2],
        0.0193339 * colorArray[0] +
            0.119192 * colorArray[1] +
            0.9503041 * colorArray[2],
    ];

    const Xn = 0.95047;
    const Yn = 1.0;
    const Zn = 1.08883;

    const fx = f(xyz[0] / Xn);
    const fy = f(xyz[1] / Yn);
    const fz = f(xyz[2] / Zn);

    const factor = 10 ** decimalPrecision;
    return [
        Math.round((116 * fy - 16) * factor) / factor, // L*
        Math.round(500 * (fx - fy) * factor) / factor, // a*
        Math.round(200 * (fy - fz) * factor) / factor, // b*
    ];
}

function f(t: number): number {
    if (t > 0.008856) {
        return t ** 0.3333333;
    } else {
        return 7.787 * t + 0.137931034;
    }
}
