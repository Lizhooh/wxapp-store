
function isType(type) {
    const t = Object.prototype.toString.call(type);
    return t.slice(8, t.length - 1);
}

module.exports = class Store {
    constructor(opt) {
        if (typeof wx !== 'object') {
            var wx = {};
        }
        this._opt = {
            async: true,
            wx: wx,
            ...opt,
        };
        this.wx = this._opt.wx;
        if (typeof this.wx !== 'object') {
            console.error('wx is not define.');
        }
    }

    /**
     * 把任意类型的数据转换为小程序支持的数据类型存储
     * @param {Any} val
     * @return {Object|String}
     */
    _convertTo(val) {
        const _type = isType(val);
        if (_type === 'RegExp') {
            return `@@${_type}|${val.toString()}`;
        }
        return val;
    }
    /**
     * 把小程序支持的数据类型转换为任意的数据类型
     * @param {Object|String} val
     * @return {Any}
     */
    _convertFrom(val) {
        const _type = isType(val);
        if (_type === 'String') {
            // 可使用非正则表达式来优化性能
            if (val.slice(0, 2) === '@@') { // @@ 为标志性字符。
                const [_, t, c] = val.match(/@@([a-zA-Z]+)\|(.*)/) || ['', ''];
                if (t === 'RegExp') {
                    const [_1, r] = c.match(/^\/(.*)\//) || ['', ''];
                    const [_2, f] = c.match(/\/(\w+)$/) || ['', ''];
                    return new RegExp(r, f);
                }
            }
        }
        return val;
    }

    _get(key) {
        if (this._opt.async) {
            return new Promise((resolve, reject) => {
                this.wx.getStorage({
                    key: key,
                    success: res => resolve(this._convertFrom(res.data)),
                    fail: err => reject(err),
                });
            });
        }
        else {
            return this.wx.getStorageSync(key);
        }
    }
    _set(key, value) {
        if (this._opt.async) {
            return new Promise((resolve, reject) => {
                this.wx.setStorage({
                    key: key,
                    data: this._convertTo(value),
                    success: res => resolve(res),
                    fail: err => reject(err),
                });
            });
        }
        else {
            return this.wx.setStorageSync(key, value);
        }
    }
    _remove(key) {
        if (this._opt.async) {
            return new Promise((resolve, reject) => {
                this.wx.removeStorage({
                    key: key,
                    success: res => resolve(res),
                    fail: err => reject(err),
                });
            });
        }
        else {
            return this.wx.removeStorageSync(key);
        }
    }
    _clear() {
        if (this._opt.async) {
            return this.wx.clearStorage();
        }
        else {
            return this.wx.clearStorageSync();
        }
    }
    _info() {
        if (this._opt.async) {
            return new Promise((resolve, reject) => {
                this.wx.getStorageInfo({
                    success: res => resolve(res),
                    fail: err => reject(err),
                });
            });
        }
        else {
            return this.wx.getStorageInfoSync();
        }
    }


    // public
    get(key) {
        try {
            return this._get(key);
        }
        catch (e) {
            console.error('Store get error:', e);
        }
    }
    set(key, val) {
        try {
            return this._set(key, val);
        }
        catch (e) {
            console.error('Store set error:', e);
        }
    }
    remove(key) {
        try {
            return this._remove(key);
        }
        catch (e) {
            console.error('Store remove error:', e);
        }
    }
    info() {
        try {
            return this._info();
        }
        catch (e) {
            console.error('Store info error:', e);
        }
    }
    clear() {
        try {
            return this._clear();
        }
        catch (e) {
            console.error('Store clear error:', e);
        }
    }
}

