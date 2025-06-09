export class Projectile {
    x: number;
    y: number;
    x_velocity: number;
    y_velocity: number;
    static SPEED = 1;

    constructor(x: number, y: number, direction: number) {
        this.x = x;
        this.y = y;
        this.x_velocity = Math.cos(direction * Math.PI / 180) * Projectile.SPEED;
        this.y_velocity = Math.sin(direction * Math.PI / 180) * Projectile.SPEED;
    }

    update() {
        this.x += this.x_velocity;
        this.y += this.y_velocity;
    }

    draw(ctx: CanvasRenderingContext2D) {
        this.update();
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.arc(this.x, this.y, 1, 0, Math.PI * 2, false);
        ctx.fill();
    }
}