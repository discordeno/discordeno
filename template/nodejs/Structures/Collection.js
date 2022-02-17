class Collection extends Map {
    constructor(options = {}) {
        super();
        this.client = options.client;
        this.properties = options.properties;
        this.transformerClass = options.transformerClass;
    }

    _set(key, value) {
        return super.set(key, value);
    }

    _get(key) {
        if (typeof key === 'string') key = BigInt(key);
        const v = super.get(key);
        if(!v) return null;

        if (!v.channels) v.channels = new CloneCollection({ cache: this.client.channels.cache });
        if (!v.roles) v.roles = new CloneCollection({ cache: this.client.roles.cache });
        if (!v.emojis) v.emojis = new CloneCollection({ cache: this.client.emojis.cache });
        if (!v.messages) v.messages = new CloneCollection({ cache: this.client.messages.cache });
        if (!v.stageInstances) v.stageInstances = new CloneCollection({ cache: this.client.channels.cache });
        if (!v.members) v.members = new CloneCollection({ cache: this.client.members.cache, memberGuildId: v.id });
        if (!v.threads) v.threads = new CloneCollection({ cache: this.client.channels.cache });
        return v;
    }

    _delete(key) {
        return super.delete(key);
    }

    base(v, options = {}) {
        if (options.channels) v.channels = new CloneCollection({ cache: this.client.channels.cache });
        if (options.roles) v.roles = new CloneCollection({ cache: this.client.roles.cache });
        if (options.emojis) v.emojis = new CloneCollection({ cache: this.client.emojis.cache });
        if (options.messages) v.messages = new CloneCollection({ cache: this.client.messages.cache });
        if (options.stageInstances) v.stageInstances = new CloneCollection({ cache: this.client.channels.cache });
        if (options.members) v.members = new CloneCollection({ cache: this.client.members.cache, memberGuildId: v.id });
        if (options.threads) v.threads = new CloneCollection({ cache: this.client.channels.cache });

        return v;
    }

    set(k, v) {
        if (!v) return null;
        //if (super.has(k)) return this.patch(k, v);

        this.properties = Object.keys(v);
        if (!v.guildId) {
            if (this.properties.includes('channels') && v.channels) {
                const channels = new CloneCollection({ cache: this.client.channels.cache });
                v.channels.forEach(x => {
                    if (typeof x !== 'object') channels.set(x, true);
                    else {
                        channels.patch(x.id, x);
                    }
                });
                v.channels = channels;
            }
            if (this.properties.includes('threads') && v.threads) {
                const threads = new CloneCollection({ cache: this.client.channels.cache });
                v.threads.forEach(x => {
                    if (typeof x !== 'object') channels.set(x, true);
                    else {
                        channels.patch(x.id, x);
                    }
                });
                v.threads = threads;
            }
            if (this.properties.includes('roles') && v.roles) {
                const roles = new CloneCollection({ cache: this.client.roles.cache });
                v.roles.forEach(x => {
                    if (typeof x !== 'object') roles.set(x, true);
                    else {
                        roles.patch(x.id, x);
                    }
                });
                v.roles = roles;
            }
            if (this.properties.includes('emojis') && v.emojis) {
                const emojis = new CloneCollection({ cache: this.client.emojis.cache });
                v.emojis.forEach(x => {
                    if (typeof x !== 'object') emojis.set(x, true);
                    else {
                        emojis.patch(x.id, x);
                    }
                });
                v.emojis = emojis;
            }
            if (this.properties.includes('messages') && v.messages) {
                const messages = new CloneCollection({ cache: this.client.messages.cache });
                v.messages.forEach(x => {
                    if (typeof x !== 'object') messages.set(x, true);
                    else {
                        messages.patch(x.id, x);
                    }
                });
                v.messages = messages;
            }
            if (this.properties.includes('stageInstances') && v.stageInstances) {
                const stageInstances = new CloneCollection({ cache: this.client.channels.cache });
                v.stageInstances.forEach(x => {
                    if (typeof x !== 'object') stageInstances.set(x, true);
                    else {
                        stageInstances.patch(x.id, x);
                    }
                });
                v.stageInstances = stageInstances;
            }
            if (this.properties.includes('members') && v.members) {

                const members = new CloneCollection({ cache: this.client.members.cache, memberGuildId: v.id });
                v.members.forEach(x => {
                    if (typeof x !== 'object') members.set(x, true);
                    else {
                        if (x?.user) members.set(x.user.id, x);
                        else members.set(x.id, x)
                    }
                });
                v.members = members;
            }
        }
        const value = this.properties
            .reduce((obj2, key) => {
                if (key in v) obj2[key] = v[key];
                return obj2;
            }, {});
        if (v.guild_id) value.guild_id = v.guild_id;
        return this._set(k, value);
    }


    get(k, options = {}) {
        if (!options.transformKey && typeof k === 'string') k = BigInt(k);
        if (!super.has(k)) return null;
        const v = super.get(k);
        const edit = this.transform(v);
        edit._cache = true;
        return edit;
    }

    transform(v, options = {}) {
        const classOptions = {
            channels: v.channels,
            roles: v.roles,
            emojis: v.emojis,
            messages: v.messages,
            stageInstances: v.stageInstances,
            //members: v.members,
            threads: v.threads,
        }
        return new this.transformerClass(this.client, v, classOptions);
    }

    patch(k, v) {
        if (!super.has(k)) return this.set(k, v);

        const old = this._get(k);
        if (this.properties.includes('channels') && v.channels) {
            v.channels.forEach(x => {
                if (typeof x !== 'object') old.channels.set(x, true);
                else {
                    old.channels.patch(x.id, x);
                }
            });
            v.channels = old.channels;
        }
        if (this.properties.includes('threads') && v.threads) {
            v.threads.forEach(x => {
                if (typeof x !== 'object') old.channels.set(x, true);
                else {
                    old.channels.patch(x.id, x);
                }
            });
            v.threads = old.threads;
        }
        if (this.properties.includes('roles') && v.roles) {
            v.roles.forEach(x => {
                if (typeof x !== 'object') old.roles.set(x, true);
                else {
                    old.roles.patch(x.id, x);
                }
            });
            v.roles = old.roles;
        }
        if (this.properties.includes('emojis') && v.emojis) {
            v.emojis.forEach(x => {
                if (typeof x !== 'object') old.emojis.set(x, true);
                else {
                    old.emojis.patch(x.id, x);
                }
            });
            v.emojis = old.emojis;
        }
        if (this.properties.includes('messages') && v.messages) {
            v.messages.forEach(x => {
                if (typeof x !== 'object') old.messages.set(x, true);
                else {
                    old.messages.patch(x.id, x);
                }
            });
            v.messages = old.messages;
        }
        if (this.properties.includes('stageInstances') && v.stageInstances) {
            v.stageInstances.forEach(x => {
                if (typeof x !== 'object') old.stageInstances.set(x, true);
                else {
                    old.stageInstances.patch(x.id, x);
                }
            });
            v.stageInstances = old.stageInstances;
        }
        if (this.properties.includes('members') && v.members) {
            v.members.forEach(x => {
                if (typeof x !== 'object') old.members.set(x, true);
                else {
                    if (x?.user) old.members.set(x.user.id, x);
                    else old.members.set(x.id, x)
                }
            });
            v.members = old.members;
        }
        //

        return this._set(k, v);
    }


}
module.exports = Collection;



class CloneCollection extends Map {
    constructor(options = {}) {
        super();
        this.cache = options.cache;
        if (options.memberGuildId) this.createKey = (k) => {
            return `${k}${options.memberGuildId}`;
        };
        else this.createKey = (k) => k;

    }
    get(key) {
        if (typeof key === 'string') key = BigInt(key);
        key = this.createKey(key);
        return this.cache.get(key, { transformKey: true });
    }

    _get(key) {
        if (typeof key === 'string') key = BigInt(key);
        key = this.createKey(key);
        return this.cache._get(key, { transformKey: true });
    }

    set(key, value) {
        super.set(key, true);
        if (typeof value !== 'object') return true;
        key = this.createKey(key);
        return this.cache.set(key, value);
    }

    delete(key) {
        super.delete(key);
        key = this.createKey(key);
        return this.cache.delete(key);
    }

    values(options = {}) {
        if (options.raw) {
            const values = new Map([...super.keys()].map(x => this.cache._get(this.createKey(x), { transformKey: true })).map(x => [x.id, x]));
            return values.values();
        }
        const values = new Map([...super.keys()].map(x => this.cache.get(this.createKey(x), { transformKey: true })).map(x => [x.id, x]));
        return values.values();
    }

    keys() {
        const values = new Map([...super.keys()].map(x => this.cache.get(this.createKey(x), { transformKey: true })).map(x => [x.id, x]));
        return values.keys();
    }

    _keys() {
        return super.keys();
    }

    map(fn) {
        return [...this.values()].map(fn);
    }

    clear() {
        return [...this.keys()].forEach(x => this.delete(x));
    }

    patch(key, value) {
        //console.log(`[Patching] ${key}`);
        const editKey = this.createKey(key);
        if (!this.cache.has(editKey)) return this.set(key, value);
        const oldValue = this.cache._get(editKey);
        Object.keys(value).forEach(k => {
            if (k in oldValue && value[k]) oldValue[k] = value[k];
        });
        return this.set(key, oldValue);
    }
}