type IApi<T = { [key: string]: { req: object, res: object } }> = {
    [K in keyof T]: {
        // @ts-ignore
        req: T[K]['req'],
        // @ts-ignore
        res: T[K]['res']
    }
}

type IRes = {
    res: any
    error: any
}

type IMsg<U = { [key: string]: object }> = {
    [K in keyof U]: U[K]
}

export interface IModel <T, U> {
    api: IApi<T>
    msg: IMsg<U>
}
