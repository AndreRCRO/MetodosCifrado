

const isLetter = (ch) => /[a-zA-Z]/.test(ch)

const shiftChar = (ch, shift) => {
    const isUpper = ch >= 'A' && ch <= 'Z';
    const base = isUpper ? 'A'.charCodeAt(0) : 'a'.charCodeAt(0);
    const code = ch.charCodeAt(0) - base;
    const mod = ((code + shift) % 26 + 26) % 26;
    return String.fromCharCode(base + mod);
};


export function caesarEncrypt(text, shift = 3) {
    const s = Number.isFinite(Number(shift)) ? Number(shift) : 3;
    let out = '';
    for (const ch of text) {
        out += isLetter(ch) ? shiftChar(ch, s) : ch;
    }
    return out;
}
export function caesarDecrypt(text, shift = 3) {
    return caesarEncrypt(text, -Number(shift));
}



//ME EQUIVOQUE PERO NO PIENSO BORRAR NADA >:D

const AsciiShift = (shift) => {
    const n = Number(shift) || 0;
    const mod = 256;
    return ((n % mod) + mod) % mod;
};

export function asciiShiftEncrypt (text, shift = 0) {
    const s = AsciiShift(shift);
    let out = '';
    for (const ch of text) {
        const cp = ch.codePointAt(0);
        if (cp <= 255){
            const shifted = (cp + s) % 256;
            out += String.fromCodePoint(shifted);
        } else {
            out += ch;
        }
    }
    return out;
}

export function asciiShiftDecrypt (text, shift = 0) {
    return asciiShiftEncrypt(text, -Number(shift));
}