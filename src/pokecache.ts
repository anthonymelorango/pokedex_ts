export type CacheEntry<T> = {
    createdAt: number,
    val: T,
}

export class PokeCache {
    #cache = new Map<string, CacheEntry<any>>();
    #reapIntervalId: NodeJS.Timeout | undefined = undefined;
    #interval: number;

    constructor(interval: number) {
        this.#interval = interval;
        this.#startReapLoop();
    }

    add<T>(key: string, val: T): void {
        this.#cache.set(key, {
            createdAt: Date.now(),
            val: val,
        });
    }

    get<T>(key: string): CacheEntry<T> | undefined {
        return this.#cache.get(key);
    }

    #reap(): void {
        const reapTime = Date.now() - this.#interval;
        for (let key of this.#cache.keys()) {
            const entry = this.#cache.get(key);
            if (entry !== undefined &&  entry?.createdAt < reapTime) {
                this.#cache.delete(key);
            }
        }
    }

    #startReapLoop(): void {
        this.#reapIntervalId = setInterval(() => { this.#reap() }, this.#interval);
    }

    stopReapLoop(): void {
        clearInterval(this.#reapIntervalId);
        this.#reapIntervalId = undefined;
    }
}
