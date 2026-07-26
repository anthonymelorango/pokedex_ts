import { LocationData } from "./pokeapi_locationdata.js";
import { PokemonData } from "./pokeapi_pokemondata.js";
import { ShallowLocations } from "./pokeapi_shallowlocations.js";
import { PokeCache } from "./pokecache.js";

export class PokeAPI {
    private static readonly baseURL = "https://pokeapi.co/api/v2";
    private static readonly locationAreaSuffix = "/location-area";
    private static readonly pokemonSuffix = "/pokemon";

    #cache: PokeCache;

    constructor() {
        this.#cache = new PokeCache(60000);
    }

    async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
        if (pageURL === undefined || pageURL === "") {
            pageURL = `${PokeAPI.baseURL}${PokeAPI.locationAreaSuffix}`;
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
        const pageURL = `${PokeAPI.baseURL}${PokeAPI.locationAreaSuffix}/${locationName}`;

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
        //console.log(locationData);
        return locationData;
    }

    async fetchPokemon(pokemonName: string): Promise<PokemonData> {
        if (pokemonName === "") {
            throw new Error("No Pokemon name provided");
        }
        const pageURL = `${PokeAPI.baseURL}${PokeAPI.pokemonSuffix}/${pokemonName}`;

        let pokemonData;
        const cacheResult = this.#cache.get(pageURL);
        if (cacheResult === undefined) {
            //console.log(`Data NOT found in cache for ${pageURL}, fetching from URL`);

            const response = await fetch(pageURL);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            pokemonData = await response.json();
            this.#cache.add(pageURL, pokemonData);
        } else {
            //console.log(`Data found in cache for ${pageURL}`);
            pokemonData = cacheResult.val;
        }
        //console.log(pokemonData);
        return pokemonData;
    }
}
