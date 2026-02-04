const re = new RegExp(/^#(?:[a-f\d]{2}){3}$/i);
export default function isHexColorString(color: string): boolean {
    return re.test(color);
}
