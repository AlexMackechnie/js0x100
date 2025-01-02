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
        this.clearScreen();
        this.instructions();
        this.initialisePlayers();
        await this.getShipInputAndPlace();

        gameLoop:
        while (true) {
            for (let playerIndex = 0; playerIndex < this.players.length; playerIndex++) {
                const gameOver = await this.takeTurn(playerIndex);
                if (gameOver) {
                    console.log(`🌊 ${this.players[1 - playerIndex].getName()} has no ships left!\n`);
                    console.log(`🏆 ${this.players[playerIndex].getName()} wins!`);

                    await this.rl.question("\n⚓️ Press Enter to exit: ");

                    break gameLoop;
                }
            }
        }

        this.rl.close();
        process.stdout.write('\x1Bc');
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
        // this.players[0].placeShips({"one1": new LongShip("one1", 1, 1, "v"), "one2": new SpeedBoat("one2", 2, 2, "h") });
        // this.players[1].placeShips({"two1": new LongShip("two1", 3, 1, "v"), "two2": new SpeedBoat("two2", 4, 4, "h") });
        for (let player of this.players) {
            let ships: { [key: string]: Battleship} = {};
            console.log(`⚓️ ${player.getName()}, place your ships!`);
            for (let i = 0; i < 1; i++) {
                const shipType: string = await this.rl.question("\n⚓️ LongShip[1x5] (ls) or SpeedBoat[1x1] (sb)?: ");
                const shipName: string = await this.rl.question("⚓️ Boat name?: ");
                const positionToPlaceString: string = await this.rl.question("⚓️ X,Y Position?: ");
                const positionToPlace: number[] = positionToPlaceString.split(",").map((s: string) => parseFloat(s.trim()));
                const orientation: string = await this.rl.question("⚓️ Orientation (h or v)?: ");
                if (shipType === "ls") {
                    ships[shipName] = new LongShip(shipName, positionToPlace[0], positionToPlace[1], orientation);
                } else if (shipType === "sb") {
                    ships[shipName] = new SpeedBoat(shipName, positionToPlace[0], positionToPlace[1], orientation);
                }
                console.log(ships[shipName].toString());
            }
            player.placeShips(ships);
            await this.rl.question("\n⚓️ Press Enter to continue: ");
            this.clearScreen();
        }
    }

    async takeTurn(playerIndex: number): Promise<boolean> {
        let attackingPlayer: Player = this.players[playerIndex];
        let defendingPlayer: Player = this.players[1 - playerIndex];

        const positionToHitString: string = await this.rl.question(`⚓️ ${attackingPlayer.getName()}, enter X,Y to hit: `);
        let positionToHit: number[] = positionToHitString.split(",").map((s: string) => parseFloat(s.trim()));

        checkingForHit:
        for (const [shipName, ship] of Object.entries(defendingPlayer.getShips())) {
            for (const [i, coord] of ship.getGridSpaces().entries()) {
                if (coord[0] === positionToHit[0] && coord[1] === positionToHit[1]) {
                    console.log(`💥 HIT on ${positionToHit}!`);
                    let remainingSpaces = ship.removeGridSpace(i);
                    if (remainingSpaces.length === 0) {
                        console.log(`⛴️ ${attackingPlayer.getName()} sunk ${defendingPlayer.getName()}'s ship: ${shipName}`);
                        defendingPlayer.removeShip(shipName);
                    }
                    await this.rl.question("\n⚓️ Press Enter to continue: ");
                    break checkingForHit;
                }
            }
        }

        // console.log(defendingPlayer.getShips());
        this.clearScreen();

        if (!Object.keys(defendingPlayer.getShips()).length) {
            return true;
        }

        return false;
    }

    clearScreen(): void {
        process.stdout.write('\x1Bc');

        console.log(`
         _           _   _   _           _     _           
        | |         | | | | | |         | |   (_)          
        | |__   __ _| |_| |_| | ___  ___| |__  _ _ __  ___ 
        | '_ \\ / _\` | __| __| |/ _ \\/ __| '_ \\| | '_ \\/ __|
        | |_) | (_| | |_| |_| |  __/\\__ \\ | | | | |_) \\__ \\
        |_.__/ \\__,_|\\__|\\__|_|\\___||___/_| |_|_| .__/|___/
                                                | |        
                                                |_|        
        `);
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
            for (let i = 0; i < this.length; i++) {
                spaces.push([this.locX + i, this.locY]);
            }
        } else if (this.orientation === "v") {
            for (let i = 0; i < this.length; i++) {
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
