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