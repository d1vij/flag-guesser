import Canvas from "@/components/Canvas";
import "./tailwind.css";

import countries from "@/assets/catagories/countries.json";
import countryFlagData from "@/assets/lab/countries.flags.json";


console.log(countries);

export default function App() {
    return (
        <div>
            <Canvas height={18} width={32} />
        </div>
    );
}
