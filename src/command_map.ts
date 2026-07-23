import { ShallowLocations } from "./pokeapi.js";
import { State } from "./state.js";

export async function commandMap(state: State) {
    const locations = await state.pokeAPI.fetchLocations(state.nextLocationsURL);

    state.prevLocationsURL = locations.previous;
    state.nextLocationsURL = locations.next;

    printLocations(locations);
}

export async function commandMapB(state: State) {
    if (state.prevLocationsURL === null || state.prevLocationsURL === "") {
        console.log("You're on the first page")
    } else {
        const locations = await state.pokeAPI.fetchLocations(state.prevLocationsURL);

        state.prevLocationsURL = locations.previous;
        state.nextLocationsURL = locations.next;

        printLocations(locations);
    }
}

function printLocations(locations: ShallowLocations) {
    for (let result of locations.results) {
        console.log(result.name);
    }
}
