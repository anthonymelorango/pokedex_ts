import { createInterface, type Interface } from "readline";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { PokeAPI } from "./pokeapi.js";
import { commandMap, commandMapB } from "./command_map.js";
import { commandExplore } from "./command_explore.js";
import { commandCatch } from "./command_catch.js";
import { Pokemon } from "./pokeapi_locationdata.js";
import { PokemonData } from "./pokeapi_pokemondata.js";
import { commandInspect } from "./command_inspect.js";
import { commandPokedex } from "./command_pokedex.js";

export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State, ...args: string[]) => Promise<void>;
};

export type State = {
    commands: Record<string, CLICommand>;
    replInterface: Interface;
    pokeAPI: PokeAPI;
    nextLocationsURL: string;
    prevLocationsURL: string;
    pokedex: Record<string, PokemonData>;
};

export function initState(): State {
    const commands = getCommands();

    const replInterface = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Pokedex > ",
    });

    const pokeAPI = new PokeAPI();
    const pokedex = {};

    return {
        commands: commands,
        replInterface: replInterface,
        pokeAPI: pokeAPI,
        nextLocationsURL: "",
        prevLocationsURL: "",
        pokedex: pokedex,
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
        explore: {
            name: "explore <location_name>",
            description: "Explore a given location",
            callback: commandExplore,
        },
        catch: {
            name: "catch <pokemon_name>",
            description: "Try to catch a given Pokemon",
            callback: commandCatch,
        },
        inspect: {
            name: "inspect <pokemon_name>",
            description: "Inspect a given caught Pokemon",
            callback: commandInspect,
        },
        pokedex: {
            name: "pokedex",
            description: "Review your caught Pokemon",
            callback: commandPokedex,
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
    };
}
