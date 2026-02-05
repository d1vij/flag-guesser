import "./tailwind.css";

import countries from "@/assets/catagories/countries.json";
import countryFlagData from "@/assets/lab/countries.flags.json";

import Canvas from "./components/HtmlCanvas/Canvas";

console.log(countries);

export default function App() {
    return (
        <div>
            {/*<Canvas height={18} width={32} />*/}
            <Canvas height={18} width={32} cellSize={20} />
        </div>
    );
}
