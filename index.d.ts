
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
    get(key: string): any | Promise<any, Error>
    set(key: string, value: any): any | Promise<any, Error>
    remove(key: string): any | Promise<any, Error>
    clear(): any | Promise<any, Error>
    info(): Info | Promise<Info, Error>
    keys(exp: string | RegExp): string[] | Promise<string[], Error>
}

