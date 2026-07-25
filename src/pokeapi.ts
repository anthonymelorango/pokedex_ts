import { LocationData } from "./pokeapi_locationdata.js";
import { ShallowLocations } from "./pokeapi_shallowlocations.js";
import { PokeCache } from "./pokecache.js";

export class PokeAPI {
    private static readonly baseURL = "https://pokeapi.co/api/v2";
    private static readonly locationAreaSuffix = "/location-area";

    #cache: PokeCache;

    constructor() {
        this.#cache = new PokeCache(60000);
    }

    async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
        if (pageURL === undefined || pageURL === "") {
            pageURL = PokeAPI.baseURL + PokeAPI.locationAreaSuffix;
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

    async fetchLocation(locationName: string): Promise<LocationData> {
        if (locationName === "") {
            throw new Error("No location name provided");
        }
        const pageURL = PokeAPI.baseURL + PokeAPI.locationAreaSuffix + `/${locationName}`;

        let locationData;
        const cacheResult = this.#cache.get(pageURL);
        if (cacheResult === undefined) {
            //console.log(`Data NOT found in cache for ${pageURL}, fetching from URL`);

            const response = await fetch(pageURL);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            locationData = await response.json();
            this.#cache.add(pageURL, locationData);
        } else {
            //console.log(`Data found in cache for ${pageURL}`);
            locationData = cacheResult.val;
        }
        //console.log(locations);
        return locationData;
    }
}
