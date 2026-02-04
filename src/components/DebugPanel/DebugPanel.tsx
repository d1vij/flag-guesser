import countries_json from "@/assets/lab/countries.flags.json";

import guessFlagName from "@/lib/guessFlagName";
import type { opts } from "@/lib/guessFlagName";
import { useColorGridContext } from "@/hooks/useCanvasGridContext";
import { useState } from "react";
import type { FlagRecords } from "@/types";

const countries = countries_json as unknown as FlagRecords

const _opts: opts = {
    distanceThreshold: 50,
    thresholdDelta: 10,

    minPixelsWithinThresholdToCountAsAMatch: 400,
    maximumRecursionCount: 5,
    maxMatchesToReturns: 10,

    userBufferColorType: "hex",
    printDebug: false,
};
export default function DebugPanel() {
    const [guess, setGuess] = useState<string[]>([]);
    const { grid } = useColorGridContext();

    function guessFlag() {
        setGuess(() => guessFlagName(grid, countries, _opts));
    }

    return (
        <div className="bg-green-300">
            <p>Guesses</p>
            <p>{guess}</p>
            <button type="button" onClick={guessFlag}>Guess</button>
        </div>
    );
}
