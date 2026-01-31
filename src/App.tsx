import { useState } from "react";
import "./tailwind.css";

// function App() {
//     return (
//         <div className="bg-white size-full absolute top-0">
//             <CountryFlag />
//         </div>
//     );
// }


function App() {
    const [colorA, setColorA] = useState("#F00");
    const [colorB, setColorB] = useState("#0F0");
    const [result, setResult] = useState("")
    function handleClick() {
        
    }

    return (
        <div>
            <input
                type="color"
                value={colorA}
                onChange={(e) => setColorA(e.target.value)}
            />
            <input value={colorA} onChange={(e) => setColorB(e.target.value)} />
            <input
                type="color"
                value={colorB}
                onChange={(e) => setColorA(e.target.value)}
            />
            <input value={colorB} onChange={(e) => setColorB(e.target.value)} />

            <button type="button" onClick={handleClick}>
                Calculate DeltaE
            </button>
            <span>{result}</span>
        </div>
    );
}

export default App;
