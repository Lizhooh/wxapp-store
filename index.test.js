const Store = require('.');

describe('wxapp-store', () => {

    test('convertTo', () => {
        const store = new Store({ wx: {} });
        expect(store._convertTo('abc')).toEqual('abc');
        expect(store._convertTo(1)).toEqual(1);
        expect(store._convertTo(true)).toEqual(true);
        expect(store._convertTo([1, 2, 3])).toEqual([1, 2, 3]);
        expect(store._convertTo({ name: 'xiao' })).toEqual({ name: 'xiao' });
        expect(store._convertTo(/[a-zA-Z]/gi)).toEqual('@@RegExp|/[a-zA-Z]/gi');
    });

    test('convertFrom', () => {
        const store = new Store({ wx: {} });
        expect(store._convertFrom('abc')).toEqual('abc');
        expect(store._convertFrom(1)).toEqual(1);
        expect(store._convertFrom(true)).toEqual(true);
        expect(store._convertFrom([1, 2, 3])).toEqual([1, 2, 3]);
        expect(store._convertFrom({ name: 'xiao' })).toEqual({ name: 'xiao' });
        expect(store._convertFrom('@@RegExp|/[a-zA-Z]/gi')).toEqual(/[a-zA-Z]/gi);
    });

});