import { useColorContext } from "@/hooks/useColorContext";

export default function ColorPicker() {
    const { color, setColor } = useColorContext();

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setColor(e.target.value);
    }

    return (
        <div className="p-1 bg-red-300 size-fit m-1">
            <label className="flex items-center cursor-pointer">
                <input type="color" value={color} onChange={handleChange} className="size-10" />
                {color}
            </label>
        </div>
    );
}
