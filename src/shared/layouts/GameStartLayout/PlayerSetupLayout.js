import  React  from 'react';
import ClickableCard from '../../components/ClickableCard';

const PlayerSetupLayout = ({ gameSettings, setPlayerName }) => {
    const layout = [];
    console.log(gameSettings.spies);
    for (var player = 0; player < gameSettings.numPlayers; player++) {
        if (gameSettings.spies.has(player)) {
            console.log("THIS IS THE SPY " + player);
        }
        layout.push(<ClickableCard setPlayerName={setPlayerName} playerIndex={player} isSpy={gameSettings.spies.has(player)} gameLocation={gameSettings.gameLocation}/>)
    }
    return (
        <div>
            {layout}
        </div>
    );
}

export default PlayerSetupLayout;
