export class Wall {
    x: number;
    y: number;
    width: number;
    length: number;
    direction: number;
    image: HTMLImageElement;

    constructor(data: { x: number; y: number; width: number; length: number, direction: number }) {
        this.x = data.x;
        this.y = data.y;
        this.width = data.width;
        this.length = data.length;
        this.direction = data.direction;
        this.image = new Image();
        this.image.src = '/wall.png';
    }

    draw(ref: HTMLCanvasElement) {
        const ctx = ref.getContext("2d");
        if (!ctx) {
            throw new Error("Could not get 2D context from canvas.");
        }

        if (!this.image.complete) {
            this.image.onload = () => this.draw(ref);
            return;
        }

        const tileSize = Math.min(this.width, this.length);
        const tile = resizeImage(this.image, tileSize, tileSize);

        const pattern = ctx.createPattern(tile, 'repeat');
        if (pattern) {
            ctx.save(); // Save current context state
            ctx.translate(this.x, this.y);

            ctx.fillStyle = pattern;
            ctx.fillRect(0, 0, this.width, this.length);

            ctx.restore();
        }
    }

}

function resizeImage(img: HTMLImageElement, width: number, height: number): HTMLCanvasElement {
    const offscreen = document.createElement("canvas");
    offscreen.width = width;
    offscreen.height = height;

    const ctx = offscreen.getContext("2d");

    if (ctx) {
        ctx.imageSmoothingEnabled = false; // Important for pixel art

        ctx.drawImage(
            img,
            0, 0, img.width, img.height,                  // source: full image
            0, 0, // destination: draw centered
            width, height            // scaled size
        );
    }

    return offscreen;
}