export default class Tank {
    x = 0;
    y = 0;
    direction = 0;
    isDead = false;

    constructor(x: number, y: number, direction: number) {
        this.x = x;
        this.y = y;
        this.direction = direction;
    }

    move() {}

    _shiftPosition() {}


}