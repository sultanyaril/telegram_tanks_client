import styles from "./MainMenu.module.css"

function MainMenu() {
    return (
        <div className={ styles.MainMenu }>
            <div className={ styles.Title }>TAANKI</div>
            <div className={ styles.Options }>Start Game</div>
            <div className={ styles.Options }>Settings</div>
            <div className={ styles.Options }>Quit</div>
        </div>
    )
}

export default MainMenu;