import { createInterface } from "node:readline";

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

    replInterface.prompt();

    replInterface.on("line", (input: string) => {
        const cleanedInput = cleanInput(input);
        if (cleanedInput.length === 0) {
            replInterface.prompt();
            return;
        }
        console.log(`Your command was: ${cleanedInput[0]}`);
        replInterface.prompt();
    });
}
