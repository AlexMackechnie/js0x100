import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";


class Game {
    rl: readline.Interface;
    boats: { [key: string]: Battleship};

    constructor() {
        this.rl = readline.createInterface(input, output);
        this.boats = {}
    }

    async gameLoop(): Promise<void> {
        this.instructions();
        while(true) {
            console.log("-------------");
            const answer = await this.rl.question("⚓️ Your input: ");

            switch(answer) {
                case "c":
                    const boatType = await this.rl.question("⚓️ LongBoat (ls) or SpeedBoat (sb)?: ");
                    const boatName = await this.rl.question("⚓️ Boat name?: ");
                    const xPos = Number(await this.rl.question("⚓️ X Position?: "));
                    const yPos = Number(await this.rl.question("⚓️ Y Position?: "));
                    if (boatType === "ls") {
                        this.boats[boatName] = new LongShip(xPos, yPos);
                    }
                    break;
                case "l":
                    console.log(this.boats);
                    break;
                default:
                    break
            }
            console.log("-------------");
        }
    }

    instructions(): void {
        console.log("⚓️ (c) Create a ship.");
        console.log("⚓️ (l) List ships.");
    }

    getUserInput(): void {
        readline
    }
}

abstract class Battleship {
    protected locX: number;
    protected locY: number;
    protected length: number;
    protected height: number;

    constructor(locX: number, locY: number, length: number, height: number) {
        this.locX = locX;
        this.locY = locY;
        this.length = length;
        this.height = height;
    }

    move(moveX: number, moveY: number): void {
        this.locX += moveX; 
        this.locY += moveY; 
    }

    getGridSpaces(): number {
        return this.length * this.height;
    }

    getPosition(): [number, number] {
        return [this.locX, this.locY]
    }
}

class LongShip extends Battleship {
    constructor(locX: number, locY: number) {
        super(locX, locY, 5, 1);
    }
}

class SpeedBoat extends Battleship {
    constructor(locX: number, locY: number) {
        super(locX, locY, 1, 1);
    }

    boost(newLocX: number, newLocY: number): void {
        this.locX = newLocX; 
        this.locY = newLocY; 
    }
}

let game = new Game();
game.gameLoop();
