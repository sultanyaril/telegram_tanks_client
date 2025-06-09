import { mockTanks, mockWalls } from "../../mockData";
import { Tank } from "../Tank/Tank";
import { Wall } from "../Wall/Wall";

export default class GameSession {
    Tanks: Map<number, Tank>;
    Walls: Wall[];
    ref: HTMLCanvasElement;

    constructor(ref: HTMLCanvasElement) {
        this.ref = ref;
        this.Tanks = new Map();
        this.Walls = [];

        const metadata = {
            tanks: mockTanks,
            walls: mockWalls,
        };

        this.loadMetaData(metadata);
        this.drawMap();
    }

    loadMetaData(metadata: { tanks: any[]; walls: any[] }) {
        metadata.tanks.forEach(tank => {
            const t = new Tank(tank);
            this.Tanks.set(tank.userId, t);
        });

        metadata.walls.forEach(wall => {
            const w = new Wall(wall);
            this.Walls.push(w);
        });
    }

    moveTank(direction: 'forward' | 'backward' | 'turn_left' | 'turn_right' | "fire") {
        const tank = this.Tanks.get(0);
        if (!tank) return;
        switch (direction) {
            case 'forward':
                tank.moveForward();
                break;
            case 'backward':
                tank.moveBackward();
                break;
            case 'turn_left':
                tank.turnLeft();
                break;
            case 'turn_right':
                tank.turnRight();
                break;
            case 'fire':
                tank.fire();
                break;
        }
    }


    drawMap() {
        const ctx = this.ref.getContext("2d");
        if (!ctx) return;

        // Clear canvas
        ctx.clearRect(0, 0, this.ref.width, this.ref.height);

        this.Walls.forEach(wall => {
            wall.draw(this.ref);
        });

        this.Tanks.forEach(tank => {
            tank.draw(this.ref);
        });
    }

}
