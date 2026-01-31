import { describe, it, expect } from "bun:test";
import { hexToRGBArray } from "../src/lib/color-stuff/hexToRGBArray";

describe("Hexstring to RGB array test", () => {
    it("Pure red", () => {
        expect(hexToRGBArray("#F00")).toBe([255, 0, 0]);
    });
});
