import { describe, it, expect } from "bun:test";
import { DeltaE94 } from "../src/lib/color-stuff/DeltaE94";
import type { LabColorArray } from "../src/lib/color-stuff/types";

/**
 * Graphic arts defaults:
 * kL = kC = kH = 1
 * K1 = 0.045
 * K2 = 0.015
 */
const deltaE94 = new DeltaE94({
    lightness: 1,
    chroma: 1,
    hue: 1,
});

describe("DeltaE94 (CIE94)", () => {
    it("returns 0 for identical colors", () => {
        const c1: LabColorArray = [50, 20, 30];
        const c2: LabColorArray = [50, 20, 30];

        expect(deltaE94.compute(c1, c2)).toBeCloseTo(0, 6);
    });

    it("matches reference value – small chroma difference", () => {
        // Reference pair commonly used in color-diff libraries
        const c1: LabColorArray = [50, 2.6772, -79.7751];
        const c2: LabColorArray = [50, 0.0, -82.7485];

        // Expected ΔE94 ≈ 1.395
        expect(deltaE94.compute(c1, c2)).toBeCloseTo(1.395, 3);
    });

    it("matches reference value – lightness difference only", () => {
        const c1: LabColorArray = [50, 0, 0];
        const c2: LabColorArray = [60, 0, 0];

        // ΔL = 10, no chroma/hue terms
        expect(deltaE94.compute(c1, c2)).toBeCloseTo(10, 6);
    });

    it("matches reference value – chroma difference only", () => {
        const c1: LabColorArray = [50, 40, 0];
        const c2: LabColorArray = [50, 30, 0];

        // Expected ≈ 3.64
        expect(deltaE94.compute(c1, c2)).toBeCloseTo(3.64, 2);
    });

    it("handles large color differences", () => {
        const c1: LabColorArray = [20, 30, 40];
        const c2: LabColorArray = [80, -40, -50];

        const result = deltaE94.compute(c1, c2);

        expect(result).toBeGreaterThan(50);
        expect(result).toBeLessThan(150);
    });

    it("does not produce NaN for extreme values", () => {
        const c1: LabColorArray = [0, 0, 0];
        const c2: LabColorArray = [100, 127, -128];

        const result = deltaE94.compute(c1, c2);

        expect(Number.isNaN(result)).toBe(false);
        expect(result).toBeGreaterThan(0);
    });
});
