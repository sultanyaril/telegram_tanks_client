import { Projectile } from "../Projectile/Projectile";
import { WorldMap } from "../WorldMap/WorldMap";

export class Tank {
    worldMap: WorldMap;
    id: number;
    x: number;
    y: number;
    direction: number;
    size: number = 15;
    velocity: number = 1;
    angularVelocity: number = 2;
    image: HTMLImageElement;
    projectiles: Projectile[] = [];
    maxProjectiles: number = 5;
    projectilePause: number = 300;
    projectileLifeLength: number = 20000;
    lastFired: number = 0;

    constructor(worldMap: WorldMap, data: { x: number; y: number; direction: number; userId: number }) {
        this.worldMap = worldMap;
        this.id = data.userId;
        this.x = data.x;
        this.y = data.y;
        this.direction = data.direction;

        this.image = new Image();
        this.image.src = "/tank_blue.png";
    }

    draw(ref: HTMLCanvasElement) {
        const ctx = ref.getContext("2d");
        if (!ctx) throw new Error("Could not get 2D context from canvas.");

        if (!this.image.complete) {
            this.image.onload = () => this.draw(ref);
            return;
        }

        ctx.save();
        ctx.translate(this.x + this.size / 2, this.y + this.size / 2);
        ctx.rotate((this.direction * Math.PI) / 180);
        ctx.imageSmoothingEnabled = false;

        ctx.drawImage(
            this.image,
            0, 0, this.image.width, this.image.height,
            -this.size / 2, -this.size / 2,
            this.size, this.size
        );

        ctx.restore();

        this.updateProjectiles();
        this.projectiles.forEach(p => p.draw(ctx));
    }

    moveForward() {
        const nextX = this.x + Math.cos(this.degToRad(this.direction)) * this.velocity;
        const nextY = this.y + Math.sin(this.degToRad(this.direction)) * this.velocity;
        if (this.worldMap.canMove(nextX, nextY, this.size)) {
            this.x = nextX;
            this.y = nextY;
        }
    }

    moveBackward() {
        const nextX = this.x - Math.cos(this.degToRad(this.direction)) * this.velocity;
        const nextY = this.y - Math.sin(this.degToRad(this.direction)) * this.velocity;
        if (this.worldMap.canMove(nextX, nextY, this.size)) {
            this.x = nextX;
            this.y = nextY;
        }
    }

    turnLeft() {
        this.direction -= this.angularVelocity;
    }

    turnRight() {
        this.direction += this.angularVelocity;
    }

    fire() {
        const now = Date.now();
        if (now - this.lastFired < this.projectilePause) return;

        const angleRad = this.degToRad(this.direction);
        const centerX = this.x + this.size / 2;
        const centerY = this.y + this.size / 2;
        const offset = this.size / 2;

        const projectileX = centerX + Math.cos(angleRad) * offset;
        const projectileY = centerY + Math.sin(angleRad) * offset;

        if (this.projectiles.length < this.maxProjectiles) {
            this.projectiles.push(new Projectile(projectileX, projectileY, this.direction, this.worldMap));
            this.lastFired = now;
        }
    }

    private updateProjectiles() {
        const now = Date.now();
        this.projectiles = this.projectiles.filter(p => now - p.creationTime <= this.projectileLifeLength);
    }

    private degToRad(degrees: number): number {
        return (degrees * Math.PI) / 180;
    }
}
