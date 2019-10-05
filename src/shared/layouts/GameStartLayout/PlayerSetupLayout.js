import  React  from 'react';
import ClickableCard from '../../components/ClickableCard';

import "../../css/alignment.css";

const PlayerSetupLayout = ({ 
    gameSettings, 
    setPlayerName, 
    setPlayerDoneSettingUp, 
    handleCardInSetup, 
    cardSettingUp }) => {
    const layout = [];
    for (var player = 0; player < gameSettings.numPlayers; player++) {
        layout.push(<ClickableCard setPlayerName={setPlayerName} 
                    playerIndex={player}
                    isSpy={gameSettings.spies.has(player)} 
                    gameLocation={gameSettings.gameLocation}
                    setPlayerDoneSettingUp={setPlayerDoneSettingUp}
                    handleCardInSetup={handleCardInSetup}
                    cardSettingUp={cardSettingUp}/>)
    }
    return (
        <div className="d-flex align-self-center flex-column player-setup-container">
            {layout}
        </div>
    );
}

export default PlayerSetupLayout;
