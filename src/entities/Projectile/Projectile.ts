import { WorldMap } from "../WorldMap/WorldMap";

export class Projectile {
    x: number;
    y: number;
    xVelocity: number;
    yVelocity: number;
    worldMap: WorldMap;
    creationTime: number;
    static SPEED = 1;

    constructor(x: number, y: number, direction: number, worldMap: WorldMap) {
        this.worldMap = worldMap;
        this.x = x;
        this.y = y;
        const angleRad = (direction * Math.PI) / 180;
        this.xVelocity = Math.cos(angleRad) * Projectile.SPEED;
        this.yVelocity = Math.sin(angleRad) * Projectile.SPEED;
        this.creationTime = Date.now();
    }

    update() {
        const nextX = this.x + this.xVelocity;
        const nextY = this.y + this.yVelocity;

        // Check horizontal collision (X axis only)
        if (!this.worldMap.canMove(nextX, this.y, 1)) {
            this.xVelocity *= -1;
        } else {
            this.x = nextX;
        }

        // Check vertical collision (Y axis only)
        if (!this.worldMap.canMove(this.x, nextY, 1)) {
            this.yVelocity *= -1;
        } else {
            this.y = nextY;
        }
    }

    draw(ctx: CanvasRenderingContext2D) {
        this.update();
        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.arc(this.x, this.y, 1, 0, Math.PI * 2);
        ctx.fill();
    }
}
