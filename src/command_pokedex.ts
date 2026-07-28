import { State } from "./state.js";

export async function commandPokedex(state: State) {
    console.log(`Your Pokedex:`);
    state.pokedex
    for (let pokemonName of Object.keys(state.pokedex)) {
        console.log(` - ${pokemonName}`);
    }
}
