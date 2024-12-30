import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";


class Game {
    rl: readline.Interface;
    ships: { [key: string]: Battleship};
    players: Array<Player>;

    constructor() {
        this.rl = readline.createInterface(input, output);
        this.ships = {}
        this.players = [];
    }

    async gameLoop(): Promise<void> {
        this.instructions();
        this.initialisePlayers();
        await this.getShipInputAndPlace();
        
        while (true) {
            for (const player of this.players) {
                await this.takeTurn(player);
                console.log("---------------------------------------");
            }
        }
        this.rl.close();
    }

    instructions(): void {
    }

    initialisePlayers(): void {
        this.players = [
            new Player("Player 1"),
            new Player("Player 2"),
        ];
    }

    async getShipInputAndPlace(): Promise<void> {
        console.log("---------------------------------------");
        let ships: { [key: string]: Battleship} = {};
        for (let player of this.players) {
            console.log(`⚓️ ${player.getName()}, place your ships!`);
            for (var i = 0; i < 1; i++) {
                const shipType = await this.rl.question("\n⚓️ LongShip (ls) or SpeedBoat (sb)?: ");
                const shipName = await this.rl.question("⚓️ Boat name?: ");
                const xPos = Number(await this.rl.question("⚓️ X Position?: "));
                const yPos = Number(await this.rl.question("⚓️ Y Position?: "));
                const orientation = await this.rl.question("⚓️ Orientation (h or v)?: ");
                if (shipType === "ls") {
                    ships[shipName] = new LongShip(shipName, xPos, yPos, orientation);
                } else if (shipType === "sb") {
                    ships[shipName] = new SpeedBoat(shipName, xPos, yPos, orientation);
                }
                console.log(ships[shipName].toString());
            }
            console.log("---------------------------------------");
        }
    }

    async takeTurn(player: Player): Promise<void> {
        const positionToHitString = await this.rl.question(`⚓️ ${player.getName()}, enter X,Y to hit: `);
        let positionToHit: number[] = positionToHitString.split(",").map((s: string) => parseFloat(s.trim()));
        console.log(positionToHit);
    }
}

class Player {
    protected name: string;
    protected ships: { [key: string]: Battleship};

    constructor(name: string) {
        this.name = name;
        this.ships = {}
    }

    placeShips(ships: { [key: string]: Battleship}): void {
        this.ships = ships;
    }

    getName(): string {
        return this.name;
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
            for (var i = 0; i < this.length; i++) {
                spaces.push([this.locX + i, this.locY]);
            }
        } else if (this.orientation === "v") {
            for (var i = 0; i < this.length; i++) {
                spaces.push([this.locX, this.locY + i]);
            }
        }
        return spaces;
    }

    toString(): string {
        return `⛴️  [${this.getPosition()}] ${this.getName().padEnd(7).padStart(8)} ${this.constructor.name.padEnd(11)} ${JSON.stringify(this.getGridSpaces())}`;
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
game.gameLoop().then(() => {
    console.log("Game done!");
});
