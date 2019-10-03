import  React  from 'react';
import ClickableCard from '../../components/ClickableCard';

const PlayerSetupLayout = ({ gameSettings, setPlayerName, setPlayerDoneSettingUp }) => {
    const layout = [];
    for (var player = 0; player < gameSettings.numPlayers; player++) {
        layout.push(<ClickableCard setPlayerName={setPlayerName} 
                    playerIndex={player}
                    isSpy={gameSettings.spies.has(player)} 
                    gameLocation={gameSettings.gameLocation}
                    setPlayerDoneSettingUp={setPlayerDoneSettingUp}/>)
    }
    return (
        <div className="d-flex align-self-center flex-column">
            {layout}
        </div>
    );
}

export default PlayerSetupLayout;
