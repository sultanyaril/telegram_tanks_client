import styles from "./MainMenu.module.css"
import {NavLink} from "react-router-dom";

function Index() {
    return (
        <div className={ styles.MainMenu }>
            <div className={ styles.Title }>TAANKI</div>
            <NavLink to={'/game'} className={ styles.Options }>Start Game</NavLink>
            <div className={ styles.Options }>Settings</div>
            <div className={ styles.Options }>Quit</div>
        </div>
    )
}

export default Index;