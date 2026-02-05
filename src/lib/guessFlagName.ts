import type { CellGrid, FlagRecords } from "@/types";
import { DeltaE94, convertRgbToLab, hexToRGBArray, type LabColorArray } from "delta-e-ts";

let DEBUG: boolean;

const DE94 = new DeltaE94({
    lightness: 1,
    chroma: 1,
    hue: 1,
});

export type opts = {
    distanceThreshold: number;
    thresholdDelta: number;

    minPixelsWithinThresholdToCountAsAMatch: number;
    maximumRecursionCount: number;
    maxMatchesToReturns: number;

    userBufferColorType: "hex";
    printDebug: boolean;
};

/**
 *      Delta E 	Perception
 *      <= 1.0 	Not perceptible by human eyes.
 *      1 - 2 	Perceptible through close observation.
 *      2 - 10 	Perceptible at a glance.
 *      11 - 49 Colors are more similar than opposite
 *      100 	Colors are exact opposite
 */

const defaultOpts: opts = {
    distanceThreshold: 30,
    minPixelsWithinThresholdToCountAsAMatch: 20,
    maximumRecursionCount: 5,
    userBufferColorType: "hex",
    maxMatchesToReturns: 5,
    thresholdDelta: 10,
    printDebug: false,
};

// // stores flag lengths if not provided
// const flagBufferCache = new Map<string, number>();

// Cache containing color hexstring and corresponding lab color array as cache
const CieLabCache = new Map<string, LabColorArray>();
function getCielabFor(hex: string) {
    if (DEBUG) {
        console.log(`Reieved hex string ${hex}`);
    }
    const cached = CieLabCache.get(hex);
    if (cached) {
        return cached;
    } else {
        const rgba = hexToRGBArray(hex);
        const value = convertRgbToLab(rgba);
        CieLabCache.set(hex, value);

        return value;
    }
}

//user buffer is hex strings and flag buffers are cielab
// no runtime checks done for any buffer lengths
export default function guessFlagName(
    userBuffer: CellGrid,
    flagBuffers: FlagRecords,
    _opts: Partial<opts> = {},
): string[] {
    const opts = { ...defaultOpts, ..._opts };

    DEBUG = opts.printDebug;

    if (opts.thresholdDelta <= 0)
        throw new Error(`thresholdStep value cannot be lesser than 0. Is ${opts.thresholdDelta}`);

    if (opts.userBufferColorType !== "hex") throw new Error("userbuffer can only be of type hexstrings");
    return __guessFlagName(userBuffer, flagBuffers, {
        maximumMatches: opts.maxMatchesToReturns,
        minPxMatchCount: opts.minPixelsWithinThresholdToCountAsAMatch,
        recursionCount: opts.maximumRecursionCount,
        threshold: opts.distanceThreshold,
        thresholdDelta: opts.thresholdDelta,
    });
}

function __guessFlagName(
    userBuffer: CellGrid,
    flagBuffers: FlagRecords,
    opts: {
        minPxMatchCount: number;
        threshold: number;
        thresholdDelta: number;
        lookupSubset?: string[];
        maximumMatches: number;
        recursionCount: number;
    },
): string[] {
    if (DEBUG) {
        console.log("-- -- -- -- -- -- -- -- --");
        console.log(`Lookup Subset ${opts.lookupSubset}`);
        console.log(`Minimum Match count ${opts.minPxMatchCount}`);
        console.log(`Distance threshold ${opts.threshold}`);
    }

    const matches: string[] = [];

    const lookupSubset = opts.lookupSubset || Object.keys(flagBuffers);

    for (const flagName of lookupSubset) {
        const flagBuffer = flagBuffers[flagName];
        let pxMatched = 0;

        if (flagBuffer.length !== userBuffer.length)
            throw new Error(`userbuffer and flag buffer (${flagName}) must have the same length`);

        if (DEBUG) {
            console.log(`Flag ${flagName}`);
        }

        for (let idx = 0; idx < userBuffer.length; idx++) {
            const userCielab = getCielabFor(userBuffer[idx]);
            if (DEBUG) {
                console.log(`User CIELAB is ${userCielab}`);
                console.log(`flag pixel cielab is ${flagBuffer[idx]}`);
            }

            const distance = DE94.compute(userCielab, flagBuffer[idx]);
            if (DEBUG) {
                console.log(`Pixel ${idx} distance ${distance}`);
            }

            if (distance <= opts.threshold) pxMatched++;
        }

        if (pxMatched >= opts.minPxMatchCount) matches.push(flagName);
        if (DEBUG) {
            console.log(`Matched pixels ${pxMatched}`);
        }
    }

    if (
        matches.length < opts.maximumMatches ||
        opts.recursionCount - 1 <= 0 ||
        opts.threshold - opts.thresholdDelta <= 1
    ) {
        return matches;
    }

    opts.recursionCount--;
    opts.threshold -= opts.thresholdDelta;
    return __guessFlagName(userBuffer, flagBuffers, {
        ...opts,
        lookupSubset: matches,
    });
}
