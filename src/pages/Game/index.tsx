import styles from "./Game.module.css";
import { useEffect, useRef } from "react";
import GameSession from "../../entities/Game/GameSession";

function Game() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const gameSessionRef = useRef<GameSession | null>(null);

    useEffect(() => {
        if (!canvasRef.current) return;

        const gameSession = new GameSession(canvasRef.current);
        gameSessionRef.current = gameSession;

        const pressedKeys = new Set<string>();

        const handleKeyDown = (event: KeyboardEvent) => {
            pressedKeys.add(event.key.toLowerCase());
        };

        const handleKeyUp = (event: KeyboardEvent) => {
            pressedKeys.delete(event.key.toLowerCase());
        };

        const update = () => {
            const session = gameSessionRef.current;
            if (session) {
                if (pressedKeys.has("w")) session.moveTank("forward");
                if (pressedKeys.has("s")) session.moveTank("backward");
                if (pressedKeys.has("a")) session.moveTank("turn_left");
                if (pressedKeys.has("d")) session.moveTank("turn_right");
                if (pressedKeys.has(" ")) session.moveTank("fire");
                session.drawMap();
            }
        };

        const interval = setInterval(update, 10); // every 0.1 second

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);

        return () => {
            clearInterval(interval);
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, []);


    return (
        <div className={ styles.Game }>
            <canvas ref={ canvasRef } id="game" className={ styles.GameCanvas }/>
        </div>
    );
}

export default Game;
