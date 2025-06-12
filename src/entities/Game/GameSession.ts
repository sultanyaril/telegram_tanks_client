import { mockTanks, mockWalls } from "../../mockData";
import { Tank } from "../Tank/Tank";
import { WorldMap } from "../WorldMap/WorldMap";

export default class GameSession {
    tanks: Map<number, Tank>;
    worldMap: WorldMap;
    canvasRef: HTMLCanvasElement;

    constructor(canvasRef: HTMLCanvasElement) {
        this.canvasRef = canvasRef;

        const metadata = {
            tanks: mockTanks,
            walls: mockWalls,
        };

        this.worldMap = new WorldMap(metadata.walls);
        this.tanks = new Map();

        metadata.tanks.forEach(tankData => {
            const tank = new Tank(this.worldMap, tankData);
            this.tanks.set(tankData.userId, tank);
        });

        this.drawMap();
    }

    moveTank(direction: "forward" | "backward" | "turn_left" | "turn_right" | "fire") {
        const tank = this.tanks.get(0); // Control tank with ID 0
        if (!tank) return;

        switch (direction) {
            case "forward":
                tank.moveForward();
                break;
            case "backward":
                tank.moveBackward();
                break;
            case "turn_left":
                tank.turnLeft();
                break;
            case "turn_right":
                tank.turnRight();
                break;
            case "fire":
                tank.fire();
                break;
        }
    }

    drawMap() {
        const ctx = this.canvasRef.getContext("2d");
        if (!ctx) return;

        ctx.clearRect(0, 0, this.canvasRef.width, this.canvasRef.height);

        this.worldMap.draw(this.canvasRef);

        this.tanks.forEach(tank => tank.draw(this.canvasRef));
    }
}
