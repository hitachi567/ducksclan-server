
export default function toNumber(str: string | number) {
    return typeof str === 'string' ? parseInt(str.replace(/\D/, '')) : str;
}
