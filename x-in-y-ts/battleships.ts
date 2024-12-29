import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";


class Game {
    rl: readline.Interface;
    ships: { [key: string]: Battleship};

    constructor() {
        this.rl = readline.createInterface(input, output);
        this.ships = {}
    }

    async gameLoop(): Promise<void> {
        this.instructions();
        while(true) {
            console.log("-------------");
            const answer = await this.rl.question("⚓️ Your input: ");

            switch(answer) {
                case "c":
                    const shipType = await this.rl.question("⚓️ LongShip (ls) or SpeedBoat (sb)?: ");
                    const shipName = await this.rl.question("⚓️ Boat name?: ");
                    const xPos = Number(await this.rl.question("⚓️ X Position?: "));
                    const yPos = Number(await this.rl.question("⚓️ Y Position?: "));
                    const orientation = await this.rl.question("⚓️ Orientation (h or v)?: ");
                    if (shipType === "ls") {
                        this.ships[shipName] = new LongShip(shipName, xPos, yPos, orientation);
                    } else if (shipType === "sb") {
                        this.ships[shipName] = new SpeedBoat(shipName, xPos, yPos, orientation);
                    }
                    break;
                case "l":
                    for (const [shipName, ship] of Object.entries(this.ships)) {
                        console.log(`⛴️  [${ship.getPosition()}] ${ship.getName().padEnd(7).padStart(8)} ${ship.constructor.name.padEnd(11)} ${JSON.stringify(ship.getGridSpaces())}`);
                    }
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
    protected name: string;
    protected locX: number;
    protected locY: number;
    protected orientation: string;
    protected length: number;
    protected gridSpaces: [number, number][];

    constructor(name: string, locX: number, locY: number, orientation: string, length: number) {
        this.name = name;
        this.locX = locX;
        this.locY = locY;
        this.orientation = orientation;
        this.length = length;

        this.gridSpaces = this.calculateGridSpaces();
    }

    move(moveX: number, moveY: number): void {
        this.locX += moveX; 
        this.locY += moveY; 

        this.gridSpaces = this.calculateGridSpaces();
    }

    getPosition(): [number, number] {
        return [this.locX, this.locY]
    }

    getGridSpaces(): [number, number][] {
        return this.gridSpaces;
    }

    getName(): string {
        return this.name;
    }

    calculateGridSpaces(): [number, number][] {
        let spaces: [number, number][] = [];
        if (this.orientation === "h") {
            console.log(this.length);
            for (var i = 0; i < this.length; i++) {
                console.log(i);
                spaces.push([this.locX + i, this.locY]);
            }
        } else if (this.orientation === "v") {
            for (var i = 0; i < this.length; i++) {
                spaces.push([this.locX, this.locY + i]);
            }
        }
        console.log(spaces);
        return spaces;
    }
}

class LongShip extends Battleship {
    constructor(name: string, locX: number, locY: number, orientation: string) {
        super(name, locX, locY, orientation, 5);
    }
}

class SpeedBoat extends Battleship {
    constructor(name: string, locX: number, locY: number, orientation: string) {
        super(name, locX, locY, orientation, 1);
    }

    boost(newLocX: number, newLocY: number): void {
        this.locX = newLocX; 
        this.locY = newLocY; 
    }
}

let game = new Game();
game.gameLoop();
