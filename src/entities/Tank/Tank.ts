import { Projectile } from "../Projectile/Projectile";

export class Tank {
    id: string;
    x: number;
    y: number;
    direction: number;
    size: number;
    velocity: number;
    angular_velocity: number;
    image: HTMLImageElement;
    projectiles: Projectile[];
    // TODO: Different weapon logic
    max_projectiles: number;
    projectile_pause: number;
    last_fired: number;

    constructor(data: { id: string; x: number; y: number; direction: number }) {
        this.id = data.id;
        this.x = data.x;
        this.y = data.y;
        this.direction = data.direction;
        this.size = 20;
        this.velocity = 1;
        this.angular_velocity = 2;
        this.image = new Image();
        this.image.src = '/tank_blue.png';
        this.projectiles = []
        this.max_projectiles = 5;
        this.projectile_pause = 300;
        this.last_fired = 0;
    }

    draw(ref: HTMLCanvasElement) {
        const ctx = ref.getContext("2d");
        if (!ctx) {
            throw new Error("Could not get 2D context from canvas.");
        }

        // Ensure the image is loaded before drawing
        if (!this.image.complete) {
            this.image.onload = () => this.draw(ref);
            return;
        }

        ctx.save(); // Save current context state

        // Move origin to the center of the tank
        ctx.translate(this.x + this.size / 2, this.y + this.size / 2);

        // Rotate the canvas (convert degrees to radians)
        ctx.rotate((this.direction * Math.PI) / 180);
        ctx.imageSmoothingEnabled = false;
        // Draw image centered at new origin (now top-left is at -size/2, -size/2)
        ctx.drawImage(
            this.image,
            0, 0, this.image.width, this.image.height,                  // source: full image
            -this.size / 2, -this.size / 2, // destination: draw centered
            this.size, this.size            // scaled size
        );

        ctx.restore(); // Restore context to avoid affecting future drawings

        this.projectiles.forEach(projectile => {
            projectile.draw(ctx);
        })
    }

    moveForward() {
        this.x += Math.cos((this.direction * Math.PI) / 180) * this.velocity;
        this.y += Math.sin((this.direction * Math.PI) / 180) * this.velocity;
    }

    moveBackward() {
        this.x -= Math.cos((this.direction * Math.PI) / 180) * this.velocity;
        this.y -= Math.sin((this.direction * Math.PI) / 180) * this.velocity;
    }

    turnLeft() {
        this.direction -= this.angular_velocity;
    }

    turnRight() {
        this.direction += this.angular_velocity;
    }

    fire() {
        console.log(Date.now() - this.last_fired);
        if (Date.now() - this.last_fired < this.projectile_pause) {
            return;
        }

        const angleRad = (this.direction * Math.PI) / 180;

        // Center of the tank
        const centerX = this.x + this.size / 2;
        const centerY = this.y + this.size / 2;

        // Fire from front of the tank (offset along direction)
        const offset = this.size / 2; // you can tweak this
        const projectileX = centerX + Math.cos(angleRad) * offset;
        const projectileY = centerY + Math.sin(angleRad) * offset;

        this.projectiles.push(new Projectile(projectileX, projectileY, this.direction));
        this.last_fired = Date.now();
    }

}
