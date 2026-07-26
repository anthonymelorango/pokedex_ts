import { State } from "./state.js";

export async function commandExplore(state: State, ...args: string[]) {
    if (args === undefined || args.length < 1) {
        console.log("Please enter a location name to explore");
        return;
    }
    const locationName = args[0];
    const location = await state.pokeAPI.fetchLocation(locationName);
    if (location === undefined) {
        console.log(`Location not found: ${locationName}`);
        return;
    }

    for (let encounter of location.pokemon_encounters) {
        console.log(encounter.pokemon.name);
    }
}
