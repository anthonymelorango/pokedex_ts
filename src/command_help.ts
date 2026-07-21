import { CLICommand } from "./command.js";

export function commandHelp(commands: Record<string, CLICommand>) {
    console.log("Welcome to the Pokedex!");
    console.log("Usage:");
    console.log("");
    for (let commandName of Object.keys(commands)) {
        const command = commands[commandName];
        console.log(`${command.name}: ${command.description}`);
    }
}
