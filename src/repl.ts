import { createInterface } from "node:readline";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { CLICommand } from "./command.js";

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

export function cleanInput(input: string): string[] {
    const rawInput = input.trim().split(" ");

    let returnInput: string[] = [];
    for (let piece of rawInput) {
        piece = piece.toLowerCase().trim();
        if (piece != "") {
            returnInput = returnInput.concat(piece);
        }
    }

    return returnInput;
}

export function startREPL() {
    const replInterface = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Pokedex > ",
    });

    const commands = getCommands();

    replInterface.prompt();

    replInterface.on("line", (input: string) => {
        const cleanedInput = cleanInput(input);
        if (cleanedInput.length === 0) {
            replInterface.prompt();
            return;
        }
        const commandString = cleanedInput[0];
        //console.log(`Your command was: ${commandString}`);
        const foundCommand = commands[commandString];
        //console.log(`Found command was: ${foundCommand}`);
        if (foundCommand === undefined) {
            console.log("Unknown command");
        } else {
            try {
                foundCommand.callback(commands);
            } catch (err) {
                console.log(err);
            }
        }
        replInterface.prompt();
    });
}
