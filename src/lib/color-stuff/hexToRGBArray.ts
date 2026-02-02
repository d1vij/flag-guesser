import type { RGBColorArray } from "./types";

/**
 * Converts Hex color strings to RGB color arrays
 * Preceeding '#' is optional
 * Function does not throw any error and returns [0,0,0] in case the parsing failed
 * https://stackoverflow.com/a/5624139
 */
export function hexToRGBArray(hex: string): RGBColorArray {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (_, r, g, b) => r + r + g + g + b + b);

    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

    return result
        ? [
              parseInt(result[1], 16),
              parseInt(result[2], 16),
              parseInt(result[3], 16),
          ]
        : [0, 0, 0];
}
