import styles from "./Game.module.css"
import {useCallback, useEffect, useRef} from "react";
import GameSession from "../../entities/Game/Game";

function Game() {
    const map = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        // loading
        // connecting to server;
        // download map;
        //

        // new Game();
    }, []);

    const mapLoaded = useCallback((ref: HTMLCanvasElement) => {
        const gameSession = new GameSession(ref);
    }, []);

    return (
        <div className={ styles.MainMenu }>
            <canvas ref={mapLoaded} id="game" />
        </div>
    )
}

export default Game;