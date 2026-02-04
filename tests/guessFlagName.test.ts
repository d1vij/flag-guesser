import { it, expect } from "bun:test";

import input from "../src/assets/countries.flags.rgb.json";
import countries_lab from "../src/assets/lab/countries.flags.json";
import countries_hex from "../src/assets/hex/countries.flags.json";
import guessFlagName from "../src/lib/guessFlagName";
import type { opts } from "../src/lib/guessFlagName";

const opts: opts = {
    distanceThreshold: 60,
    maxMatchesToReturns: 1,
    maximumRecursionCount: 50,
    thresholdDelta: 10,
    printDebug: false,
    userBufferColorType: "hex",
    minPixelsWithinThresholdToCountAsAMatch: 200,
};

it("Exact flag", () => {
    expect(guessFlagName(countries_hex["Afghanistan"], countries_lab, opts)).toEqual(["Afghanistan"]);
});

// it("Single pixel", () => {
//     expect(
//         guessFlagName(
//             ["#112233"],
//             {
//                 A: [[12.62, -0.79, -13.31]],
//                 B: ["#DDFFEE"],
//             },
//             { ...opts, minimumMatchCount: 1 },
//         ),
//     ).toEqual(["A"]);
// });
