import { createInterface, type Interface } from "readline";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";

export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State) => void;
};

export type State = {
    commands: Record<string, CLICommand>;
    replInterface: Interface;
};

export function initState(): State {
    const commands = getCommands();

    const replInterface = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Pokedex > ",
    });

    return {
        commands: commands,
        replInterface: replInterface,
    };
}

function getCommands(): Record<string, CLICommand> {
    return {
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
