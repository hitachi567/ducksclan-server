
export default function toNumber(str: string) {
    return parseInt(str.replace(/\D/, ''));
}
