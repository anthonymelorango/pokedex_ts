import { createInterface, type Interface } from "readline";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { PokeAPI } from "./pokeapi.js";
import { commandMap, commandMapB } from "./command_map.js";

export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State) => Promise<void>;
};

export type State = {
    commands: Record<string, CLICommand>;
    replInterface: Interface;
    pokeAPI: PokeAPI;
    nextLocationsURL: string;
    prevLocationsURL: string;
};

export function initState(): State {
    const commands = getCommands();

    const replInterface = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Pokedex > ",
    });

    const pokeAPI = new PokeAPI();

    return {
        commands: commands,
        replInterface: replInterface,
        pokeAPI: pokeAPI,
        nextLocationsURL: "",
        prevLocationsURL: "",
    };
}

function getCommands(): Record<string, CLICommand> {
    return {
        map: {
            name: "map",
            description: "Get a list of locations",
            callback: commandMap,
        },
        mapb: {
            name: "mapb",
            description: "Get the previous list of locations",
            callback: commandMapB,
        },
        help: {
            name: "help",
            description: "Displays a help message",
            callback: commandHelp,
        },
        exit: {
            name: "exit",
            description: "Exit the Pokedex",
            callback: commandExit,
        },
        // can add more commands here
    };
}
