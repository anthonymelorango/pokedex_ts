import { PokeCache } from "./pokecache.js";

export class PokeAPI {
    private static readonly baseURL = "https://pokeapi.co/api/v2";

    #cache: PokeCache;

    constructor() {
        this.#cache = new PokeCache(60000);
    }

    async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
        const locationAreaSuffix = "/location-area";

        if (pageURL === undefined || pageURL === "") {
            pageURL = PokeAPI.baseURL + locationAreaSuffix;
        }

        let locations;
        const cacheResult = this.#cache.get(pageURL);
        if (cacheResult === undefined) {
            //console.log(`Data NOT found in cache for ${pageURL}, fetching from URL`);

            const response = await fetch(pageURL);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            locations = await response.json();
            this.#cache.add(pageURL, locations);
        } else {
            //console.log(`Data found in cache for ${pageURL}`);
            locations = cacheResult.val;
        }
        //console.log(locations);
        return locations;
    }

    /* TODO: Implement this
    async fetchLocation(locationName: string): Promise<Location> {
        // 
    }
    */
}

export type ShallowLocations = {
    count: number
    next: string
    previous: any
    results: Result[]
};

export type Result = {
    name: string
    url: string
};
