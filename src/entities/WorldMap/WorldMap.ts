import { Wall } from "../Wall/Wall";

export class WorldMap {
    walls: Wall[];

    constructor(wallsMetadata: { x: number; y: number; width: number; length: number; direction: number }[]) {
        this.walls = wallsMetadata.map(data => new Wall(data));
    }

    draw(ref: HTMLCanvasElement) {
        this.walls.forEach(wall => wall.draw(ref));
    }

    canMove(x: number, y: number, objectSize: number): boolean {
        const tankLeft = x;
        const tankRight = x + objectSize;
        const tankTop = y;
        const tankBottom = y + objectSize;

        return !this.walls.some(wall => {
            const wallLeft = wall.x;
            const wallRight = wall.x + wall.width;
            const wallTop = wall.y;
            const wallBottom = wall.y + wall.length;

            const isColliding =
                tankRight > wallLeft &&
                tankLeft < wallRight &&
                tankBottom > wallTop &&
                tankTop < wallBottom;

            return isColliding;
        });
    }
}
