import React from 'react'
import { PlayerType } from "../types/types";
import { getPlayerAge } from "../utils/utilFunctions";

type PlayerDetailsProps = {
  style: string;
  player: PlayerType | null;
};

const PlayerDetails: React.FC<PlayerDetailsProps> = ({ style, player }) => {
  return (
    <div className={`${style}`}>
    
    {player && (
      <div className={`flex flex-col gap-1 text-sm text-gray-400 relative`}>
        <div>
          {player?.date_of_birth
            ? getPlayerAge(player?.date_of_birth) + " years"
            : "-"}
        </div>
        <div>{player?.height} cm</div>
        <div>{player?.weight ? `${player?.weight} kg` : "-"}</div>
      </div>
    )}
  </div>
  )
}

export default PlayerDetails