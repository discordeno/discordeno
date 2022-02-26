module.exports = {
    getEmoji(str) {
        if(!str) return null;
        if (str.includes('%')) return decodeURIComponent(str);
        if (!str.includes(':')) return { animated: false, name: str, id: null };
        const [_, animated, name, id] = /^<(a?):([a-z0-9_-]{2,}):(\d{18})>/i.exec(str)
        return { animated: new Boolean(animated), name, id };
    }
}