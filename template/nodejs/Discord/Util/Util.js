const Mask = (1n << 64n) - 1n;
const {Colors} = require('./Constants');


module.exports = {
    getEmoji(str) {
        if (!str) return null;
        if (str.includes('%')) return decodeURIComponent(str);
        if (!str.includes(':')) return { animated: false, name: str, id: null };
        const [_, animated, name, id] = /^<(a?):([a-z0-9_-]{2,}):(\d{18})>/i.exec(str)
        return { animated: new Boolean(animated), name, id };
    },

    convertColor(color) {
        if (typeof color === 'string') {
            if (color === 'DEFAULT') return 0;
            if (color === 'RANDOM') return Math.floor(Math.random() * (0xffffff + 1));
            color = Colors[color] ?? parseInt(color.replace('#', ''), 16);
        } else if (Array.isArray(color)) {
            color = (color[0] << 16) + (color[1] << 8) + color[2];
        }
        return color;
    },    

    packOverwrites(allow, deny, id, type) {
        return pack64(allow, 0) | pack64(deny, 1) | pack64(id, 2) | pack64(type, 3);
    },

    separateOverwrites(v) {
        return [Number(unpack64(v, 3)), unpack64(v, 2), unpack64(v, 0), unpack64(v, 1)]; // type , id, allow, deny
    },
};



function unpack64(v, shift) {
    return (v >> BigInt(shift * 64)) & Mask;
};

function pack64(v, shift) {
    const b = BigInt(v);
    if (b < 0 || b > Mask) throw new Error("should have been a 64 bit unsigned integer: " + v);
    return b << BigInt(shift * 64);
};