import { State } from "./state.js";

export async function commandHelp(state: State) {
    console.log("Welcome to the Pokedex!");
    console.log("Usage:");
    console.log("");
    for (let commandName of Object.keys(state.commands)) {
        const command = state.commands[commandName];
        console.log(`${command.name}: ${command.description}`);
    }
}
