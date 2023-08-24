export interface ICache {
    get<T>(key: string): Promise<T>
    set<T>(key: string, value: T): Promise<void>
    del(key: string): Promise<void>
}