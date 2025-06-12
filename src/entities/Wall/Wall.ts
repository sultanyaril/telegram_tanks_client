export class Wall {
    x: number;
    y: number;
    width: number;
    length: number;
    direction: number;
    image: HTMLImageElement;

    constructor(data: { x: number; y: number; width: number; length: number; direction: number }) {
        this.x = data.x;
        this.y = data.y;
        this.width = data.width;
        this.length = data.length;
        this.direction = data.direction;

        this.image = new Image();
        this.image.src = "/wall.png";
    }

    draw(ref: HTMLCanvasElement) {
        const ctx = ref.getContext("2d");
        if (!ctx) throw new Error("Could not get 2D context from canvas.");

        if (!this.image.complete) {
            this.image.onload = () => this.draw(ref);
            return;
        }

        const tileSize = Math.min(this.width, this.length);
        const tile = resizeImage(this.image, tileSize, tileSize);
        const pattern = ctx.createPattern(tile, "repeat");

        if (pattern) {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.fillStyle = pattern;
            ctx.fillRect(0, 0, this.width, this.length);
            ctx.restore();
        }
    }
}

function resizeImage(img: HTMLImageElement, width: number, height: number): HTMLCanvasElement {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");
    if (ctx) {
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, width, height);
    }

    return canvas;
}
