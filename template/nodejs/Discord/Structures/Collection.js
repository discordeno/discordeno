class Collection extends Map {
  constructor(options = {}) {
    super();
    this.client = options.client;
    this.context = options.context;
    this.properties = options.properties;
    this.transformerClass = options.transformerClass;
  }

  has(k) {
    if (typeof k === "string") k = BigInt(k);
    return super.has(k);
  }

  delete(k) {
    if (typeof k === "string") k = BigInt(k);
    return super.delete(k);
  }

  _set(key, value, options = {}) {
    if (typeof key === "string") key = BigInt(key);

    if (options.removeProps === undefined) options.removeProps = true;
    if (this.properties?._cacheAll) options.removeProps = false;
    const v = options.removeProps
      ? this.properties
        .reduce((obj2, key) => {
          if (key in value && value[key]) obj2[key] = value[key];
          return obj2;
        }, {})
      : value;
    return super.set(key, v);
  }

  _get(key, options = {}) {
    if (typeof key === "string") key = BigInt(key);
    const v = super.get(key);
    if (!v) return null;
    if (options.raw) return v;
    /*   if (!v.channels) v.channels = new CloneCollection({ cache: this.client.channels.cache });
          if (!v.roles) v.roles = new CloneCollection({ cache: this.client.roles.cache });
          if (!v.emojis) v.emojis = new CloneCollection({ cache: this.client.emojis.cache });
          if (!v.messages) v.messages = new CloneCollection({ cache: this.client.messages.cache });
          if (!v.stageInstances) v.stageInstances = new CloneCollection({ cache: this.client.channels.cache });
          if (!v.members) v.members = new CloneCollection({ cache: this.client.members.cache, memberGuildId: (v.id || v.guildId) });
          if (!v.threads) v.threads = new CloneCollection({ cache: this.client.channels.cache }); */
    return v;
  }

  _delete(key) {
    if (typeof key === "string") key = BigInt(key);
    return super.delete(key);
  }

  base(v, options = {}) {
    if (!v) return null;
    if (typeof v === "string") v = { id: BigInt(v) };
    if (typeof v.id === "string") v.id = BigInt(v.id);

    if (options.channels) v.channels = new CloneCollection({ cache: this.client.channels.cache });
    if (options.roles) v.roles = new CloneCollection({ cache: this.client.roles.cache });
    if (options.emojis) v.emojis = new CloneCollection({ cache: this.client.emojis.cache });
    if (options.messages) v.messages = new CloneCollection({ cache: this.client.messages.cache });
    if (options.stageInstances) v.stageInstances = new CloneCollection({ cache: this.client.channels.cache });
    if (options.members) {
      v.members = new CloneCollection({ cache: this.client.members.cache, memberGuildId: (v.id || v.guildId) });
    }
    if (options.threads) v.threads = new CloneCollection({ cache: this.client.channels.cache });

    return v;
  }

  set(k, v, options) {
    if (!v) return null;
    if (typeof k === "string") k = BigInt(k);
    //if (super.has(k)) return this.patch(k, v);

    if (this.context === "guild" && this.properties.includes("channels") && v.channels) {
      const channels = new CloneCollection({ cache: this.client.channels.cache });
      v.channels.forEach((x) => {
        if (typeof x !== "object") channels.set(x, true);
        else {
          channels.patch(x.id, x);
        }
      });
      v.channels = channels;
    }
    if (this.context === "guild" && this.properties.includes("threads") && v.threads) {
      const threads = new CloneCollection({ cache: this.client.channels.cache });
      v.threads.forEach((x) => {
        if (typeof x !== "object") channels.set(x, true);
        else {
          channels.patch(x.id, x);
        }
      });
      v.threads = threads;
    }
    if (this.context === "guild" && this.properties.includes("roles") && v.roles) {
      const roles = new CloneCollection({ cache: this.client.roles.cache });
      v.roles.forEach((x) => {
        if (typeof x !== "object") roles.set(x, true);
        else {
          roles.patch(x.id, x);
        }
      });
      v.roles = roles;
    }
    if (this.context === "guild" && this.properties.includes("emojis") && v.emojis) {
      const emojis = new CloneCollection({ cache: this.client.emojis.cache });
      v.emojis.forEach((x) => {
        if (typeof x !== "object") emojis.set(x, true);
        else {
          emojis.patch(x.id, x);
        }
      });
      v.emojis = emojis;
    }
    if (this.context === "channel" && this.properties.includes("messages") && v.messages) {
      const messages = new CloneCollection({ cache: this.client.messages.cache });
      v.messages.forEach((x) => {
        if (typeof x !== "object") messages.set(x, true);
        else {
          messages.patch(x.id, x);
        }
      });
      v.messages = messages;
    }
    if (this.context === "guild" && this.properties.includes("stageInstances") && v.stageInstances) {
      const stageInstances = new CloneCollection({ cache: this.client.channels.cache });
      v.stageInstances.forEach((x) => {
        if (typeof x !== "object") stageInstances.set(x, true);
        else {
          stageInstances.patch(x.id, x);
        }
      });
      v.stageInstances = stageInstances;
    }
    if (this.context === "guild" && this.properties.includes("members") && v.members) {
      const members = new CloneCollection({ cache: this.client.members.cache, memberGuildId: (v.id || v.guildId) });
      v.members.forEach((x) => {
        if (typeof x !== "object") members.set(x, true);
        else {
          if (x?.user) members.patch(x.user.id, x);
          else members.patch(x.id, x);
        }
      });
      v.members = members;
    }

    return this._set(k, v, options);
  }

  get(k, options = {}) {
    if (typeof k === "string") k = BigInt(k);
    if (!super.has(k)) return null;
    const v = super.get(k);
    const edit = this.transform(v, options);
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
      members: v.members,
      threads: v.threads,
      ...options,
    };
    return new this.transformerClass(this.client, v, classOptions);
  }

  patch(k, v) {
    if (typeof k === "string") k = BigInt(k);
    if (!super.has(k)) return this.set(k, v);

    const old = this._get(k);

    if (this.context === "guild" && this.properties.includes("channels") && v.channels) {
      if (!old.channels) old.channels = new CloneCollection({ cache: this.client.channels.cache });
      v.channels.forEach((x) => {
        if (typeof x !== "object") old.channels.set(x, true);
        else {
          old.channels.patch(x.id, x);
        }
      });
      // v.channels = old.channels;
      delete v.channels;
    }
    if (this.context === "guild" && this.properties.includes("threads") && v.threads) {
      if (!old.threads) old.threads = new CloneCollection({ cache: this.client.channels.cache });
      v.threads.forEach((x) => {
        if (typeof x !== "object") old.channels.set(x, true);
        else {
          old.channels.patch(x.id, x);
        }
      });
      //v.threads = old.threads;
      delete v.threads;
    }
    if (this.context === "guild" && this.properties.includes("roles") && v.roles) {
      if (!old.roles) old.roles = new CloneCollection({ cache: this.client.roles.cache });
      v.roles.forEach((x) => {
        if (typeof x !== "object") old.roles.set(x, true);
        else {
          old.roles.patch(x.id, x);
        }
      });
      // v.roles = old.roles;
      delete v.roles;
    }
    if (this.context === "guild" && this.properties.includes("emojis") && v.emojis) {
      if (!old.emojis) old.emojis = new CloneCollection({ cache: this.client.emojis.cache });
      v.emojis.forEach((x) => {
        if (typeof x !== "object") old.emojis.set(x, true);
        else {
          old.emojis.patch(x.id, x);
        }
      });
      // v.emojis = old.emojis;
      delete v.emojis;
    }
    if (this.context === "channel" && this.properties.includes("messages") && v.messages) {
      if (!old.messages) old.messages = new CloneCollection({ cache: this.client.messages.cache });
      v.messages.forEach((x) => {
        if (typeof x !== "object") old.messages.set(x, true);
        else {
          old.messages.patch(x.id, x);
        }
      });
      // v.messages = old.messages;
      delete v.messages;
    }
    if (this.context === "guild" && this.properties.includes("stageInstances") && v.stageInstances) {
      if (!old.stageInstances) old.stageInstances = new CloneCollection({ cache: this.client.channels.cache });
      v.stageInstances.forEach((x) => {
        if (typeof x !== "object") old.stageInstances.set(x, true);
        else {
          old.stageInstances.patch(x.id, x);
        }
      });
      // v.stageInstances = old.stageInstances;
      delete v.stageInstances;
    }
    if (this.context === "guild" && this.properties.includes("members") && v.members) {
      if (!old.members) {
        old.members = new CloneCollection({ cache: this.client.members.cache, memberGuildId: (v.id || v.guildId) });
      }
      v.members.forEach((x) => {
        if (typeof x !== "object") old.members.set(x, true);
        else {
          if (x?.user) old.members.patch(x.user.id, x);
          else old.members.patch(x.id, x);
        }
      });
      //v.members = old.members;
      delete v.members;
    }

    Object.keys(v).forEach((k) => {
      if (k in old && v[k]) old[k] = v[k];
    });
    return this._set(k, old);
  }
}
module.exports = Collection;

class CloneCollection extends Map {
  constructor(options = {}) {
    super();
    this.cache = options.cache;
    this.memberGuildId = options.memberGuildId;
    if (options.memberGuildId) {
      this.createKey = (k) => {
        return BigInt(`${k}${options.memberGuildId}`);
      };
    } else this.createKey = (k) => k;
  }
  has(key) {
    if (typeof key === "string") key = BigInt(key);

    const unmodifiedKey = key;
    const createdKey = this.createKey(key);
    // if (this.memberGuildId) console.log('has', key, super.has(unmodifiedKey));

    return this.cache.has(createdKey);
  }

  get(key, options = {}) {
    if (typeof key === "string") key = BigInt(key);
    key = this.createKey(key);
    return this.cache.get(key, { transformedKey: true, ...options });
  }

  _get(key) {
    if (typeof key === "string") key = BigInt(key);
    key = this.createKey(key);
    return this.cache._get(key, { transformedKey: true, raw: true });
  }

  set(key, value) {
    if (typeof key === "string") key = BigInt(key);
    super.set(key, true);
    //if (this.memberGuildId) console.log('set', key, super.has(key));
    if (typeof value !== "object") return true;
    key = this.createKey(key);
    return this.cache.set(key, value);
  }

  delete(key) {
    // if (this.memberGuildId) console.log('set', key, super.has(key));
    if (typeof key === "string") key = BigInt(key);
    super.delete(key);
    key = this.createKey(key);
    return this.cache.delete(key);
  }

  values(options = {}) {
    const values = new Map(
      [...super.keys()].map((x) => this.cache._get(this.createKey(x), { transformedKey: true, raw: true })).map(
        (x) => [x.id, x],
      ),
    );
    return values.values();
  }

  keys() {
    const values = new Map(
      [...super.keys()].map((x) => this.cache._get(this.createKey(x), { transformedKey: true })).map((x) => [x.id, x]),
    );
    return values.keys();
  }

  _keys() {
    return super.keys();
  }

  map(fn) {
    return [...this.values()].map(fn);
  }

  clear() {
    return [...this.keys()].forEach((x) => this.delete(x));
  }

  patch(key, value) {
    //console.log(`[Patching] ${key}`);
    if (!value) return null;
    if (typeof key === "string") key = BigInt(key);

    const editKey = this.createKey(key);
    if (!this.cache.has(editKey)) return this.set(key, value);
    const oldValue = this.cache._get(editKey, { raw: true });
    if (!oldValue) return this.set(key, value);
    Object.keys(value).forEach((k) => {
      if (k in oldValue && value[k]) oldValue[k] = value[k];
    });
    return this.set(key, oldValue);
  }
}
