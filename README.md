

## wxapp-store

<img src="https://img.shields.io/badge/wxapp--store-build-brightgreen.svg" style="width: auto; height: auto"/> <img src="https://img.shields.io/npm/v/wxapp-store.svg" style="width: auto; height: auto"/>


`wxapp-store` 是一个微信小程序本地数据持久化存储库。

**特性：**
- 简洁的 api。
- 支持 async/await，promise 语法。
- 支持基础数据类型存储：object、array、string、number、boolean。
- 支持正则表达式类型存储。
- 与原生接口保持一致的性能。
- 提供原生接口之外的功能。

### install

```js
yarn add wxapp-store
```

### api
> new Store({ async: true, wx: wx });

- `get(key)`
- `set(key, value)`
- `info()`
- `remove(key)`
- `clear()`
- `keys(exp)` 返回所有或根据正则的键。

### 使用
默认 Store 为异步存储，通过指定配置项 async 来设置。异步存储与同步存储 api 一样，使用异步存储时返回的是 Promise。__注意：__需要关闭 ES6 转 ES5。

```js
const Store = require('wxapp-store');   // 具体路径自己定位，如果使用搭手架就可以这样了
const store = new Store({ wx });        // 必须指定 wx 对象
+ async function() {
    await store.set('a', 1);
    console.log(await store.get('a'));       // 1

    await store.set('b', [1, 2, 3]);
    console.log(await store.get('b'));       // [1, 2, 3]

    await store.set('c', /url=.*/gi);
    console.log(await store.get('c'));       // /url=.*/gi

    console.log(await store.info());

    console.log(await store.keys());         // ['log', 'a', 'b', 'c']
    console.log(await store.keys(/a|b|c/));  // ['a', 'b', 'c']

    await store.remove('c');
    await store.clear();
} ();
```

![](./image/1655050480112102.png)

在 Wepy 里使用的时候，可以指定 wx 对象为 wepy。

```js
const store = new Store({ wx: wepy });
```

在 Taro 里使用的时候，可以指定 wx 对象为 Taro。

```js
const store = new Store({ wx: Taro });
```

其他使用方式一致。

