export class PokeAPI {
    private static readonly baseURL = "https://pokeapi.co/api/v2";

    constructor() {}

    async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
        const locationAreaSuffix = "/location-area";

        if (pageURL === undefined || pageURL === "") {
            pageURL = PokeAPI.baseURL + locationAreaSuffix;
        }
        const response = await fetch(pageURL);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const locations = await response.json();
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
