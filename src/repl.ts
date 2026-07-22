import { initState } from "./state.js";

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
    const state = initState();

    state.replInterface.prompt();

    state.replInterface.on("line", (input: string) => {
        const cleanedInput = cleanInput(input);
        if (cleanedInput.length === 0) {
            state.replInterface.prompt();
            return;
        }
        const commandString = cleanedInput[0];
        //console.log(`Your command was: ${commandString}`);
        const foundCommand = state.commands[commandString];
        //console.log(`Found command was: ${foundCommand}`);
        if (foundCommand === undefined) {
            console.log("Unknown command");
        } else {
            try {
                foundCommand.callback(state);
            } catch (err) {
                console.log(err);
            }
        }
        state.replInterface.prompt();
    });
}
