
export interface Info {
    currentSize: number,
    errMsg: string,
    keys: string[],
    limitSize: number,
    [rest: string]: any,
}

export interface Error {
    errMsg: string,
    [rest: string]: any,
}

export default class Store {
    constructor(opt: { wx: any })
    get(key: string): any | Promise<any>
    set(key: string, value: any): any | Promise<any>
    remove(key: string): any | Promise<any>
    clear(): any | Promise<any>
    info(): Info | Promise<Info>
    keys(exp: string | RegExp): string[] | Promise<string[]>
}

