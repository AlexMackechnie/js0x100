import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";


class Game {
    rl: readline.Interface;
    players: Array<Player>;

    constructor() {
        this.rl = readline.createInterface(input, output);
        this.players = [];
    }

    async gameLoop(): Promise<void> {
        this.instructions();
        this.initialisePlayers();
        await this.getShipInputAndPlace();

        let winner: Player;

        gameLoop:
        while (true) {
            for (var playerIndex = 0; playerIndex < this.players.length; playerIndex++) {
                const gameOver = await this.takeTurn(playerIndex);
                if (gameOver) {
                    winner = this.players[playerIndex];
                    break gameLoop;
                }
                console.log("---------------------------------------");
            }
        }

        console.log("---------------------------------------");
        console.log(`🏆 ${winner.getName()} wins!`);
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
        this.players[0].placeShips({"Boaty": new LongShip("Boaty", 1, 3, "h") });
        this.players[1].placeShips({"Speedy": new SpeedBoat("Speedy", 1, 1, "h") });
        // for (let player of this.players) {
        //     console.log(`⚓️ ${player.getName()}, place your ships!`);
        //     for (var i = 0; i < 1; i++) {
        //         const shipType = await this.rl.question("\n⚓️ LongShip (ls) or SpeedBoat (sb)?: ");
        //         const shipName = await this.rl.question("⚓️ Boat name?: ");
        //         const xPos = Number(await this.rl.question("⚓️ X Position?: "));
        //         const yPos = Number(await this.rl.question("⚓️ Y Position?: "));
        //         const orientation = await this.rl.question("⚓️ Orientation (h or v)?: ");
        //         if (shipType === "ls") {
        //             ships[shipName] = new LongShip(shipName, xPos, yPos, orientation);
        //         } else if (shipType === "sb") {
        //             ships[shipName] = new SpeedBoat(shipName, xPos, yPos, orientation);
        //         }
        //         player.placeShips(ships);
        //         console.log(ships[shipName].toString());
        //     }
        //     console.log("---------------------------------------");
        // }
    }

    async takeTurn(playerIndex: number): Promise<boolean> {
        let attackingPlayer: Player = this.players[playerIndex];
        let defendingPlayer: Player = this.players[1 - playerIndex];

        const positionToHitString = await this.rl.question(`⚓️ ${attackingPlayer.getName()}, enter X,Y to hit: `);
        let positionToHit: number[] = positionToHitString.split(",").map((s: string) => parseFloat(s.trim()));

        for (const [shipName, ship] of Object.entries(defendingPlayer.getShips())) {
            for (const [i, coord] of ship.getGridSpaces().entries()) {
                if (JSON.stringify(coord) === JSON.stringify(positionToHit)) {
                    console.log(`💥 HIT on ${positionToHit}!`);
                    let remainingSpaces = ship.removeGridSpace(i);
                    if (remainingSpaces.length === 0) {
                        console.log(`⛴️ ${attackingPlayer.getName()} sunk ${defendingPlayer.getName()}'s ship: ${shipName}`);
                        defendingPlayer.removeShip(shipName);
                    }
                }
            }
        }

        if (!Object.keys(defendingPlayer.getShips()).length) {
            console.log(`🌊 ${defendingPlayer.getName()} has no ships left!`);
            return true;
        }

        return false;
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

    getShips(): { [key: string]: Battleship} {
        return this.ships;
    }

    removeShip(name: string): void {
        delete this.ships[name];
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

    removeGridSpace(index: number): [number, number][] {
        this.gridSpaces.splice(index, 1);
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
game.gameLoop();
