import { describe, it, expect } from "bun:test";
import { hexToRGBArray } from "../src/lib/color-stuff/hexToRGBArray";
import { RGBColorArray } from "../src/lib/color-stuff/types";

describe("hexToRGBArray – valid inputs", () => {
    it("Pure red (shorthand)", () => {
        expect(hexToRGBArray("#F00")).toEqual([255, 0, 0]);
    });

    it("Pure green (shorthand)", () => {
        expect(hexToRGBArray("#0F0")).toEqual([0, 255, 0]);
    });

    it("Pure blue (shorthand)", () => {
        expect(hexToRGBArray("#00F")).toEqual([0, 0, 255]);
    });

    it("White (shorthand)", () => {
        expect(hexToRGBArray("#FFF")).toEqual([255, 255, 255]);
    });

    it("Black (shorthand)", () => {
        expect(hexToRGBArray("#000")).toEqual([0, 0, 0]);
    });

    it("Pure red (full)", () => {
        expect(hexToRGBArray("#FF0000")).toEqual([255, 0, 0]);
    });

    it("Random color (full)", () => {
        expect(hexToRGBArray("#1A2B3C")).toEqual([26, 43, 60]);
    });

    it("Lowercase hex", () => {
        expect(hexToRGBArray("#ff8800")).toEqual([255, 136, 0]);
    });

    it("Mixed-case hex", () => {
        expect(hexToRGBArray("#AaBbCc")).toEqual([170, 187, 204]);
    });
});

describe("hexToRGBArray – edge cases", () => {
    it("Minimum channel values", () => {
        expect(hexToRGBArray("#010101")).toEqual([1, 1, 1]);
    });

    it("Maximum channel values", () => {
        expect(hexToRGBArray("#FEFEFE")).toEqual([254, 254, 254]);
    });

    it("Uneven values", () => {
        expect(hexToRGBArray("#09AF10")).toEqual([9, 175, 16]);
    });
});

describe("hexToRGBArray – invalid inputs", () => {
    it("Missing #", () => {
        expect(hexToRGBArray("FFF")).toEqual([255, 255, 255]);
    });

    it("Too short", () => {
        expect(hexToRGBArray("#FF")).toEqual([0, 0, 0]);
    });

    it("Too long", () => {
        expect(hexToRGBArray("#FFFFFFF")).toEqual([0, 0, 0]);
    });

    it("Invalid characters", () => {
        expect(hexToRGBArray("#GGG")).toEqual([0, 0, 0]);
    });

    it("Non-string input", () => {
        expect(hexToRGBArray(String(123))).toEqual([17, 34, 51]);
    });

    it("Empty string", () => {
        expect(hexToRGBArray("")).toEqual([0, 0, 0]);
    });
});
