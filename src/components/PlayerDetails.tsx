import React from "react";
import { PlayerType } from "../types/types";
import { getPlayerAge } from "../utils/utilFunctions";

type PlayerDetailsProps = {
  style: string;
  player: PlayerType | null;
  playerNumber: 1 | 2;
};

const PlayerDetails: React.FC<PlayerDetailsProps> = ({
  style,
  player,
  playerNumber,
}) => {
  return (
    <div className={`${style} h-full`}>
      {player ? (
        <div className={`flex flex-col gap-1 text-sm text-gray-400 relative`}>
          <div>
            {player?.date_of_birth
              ? getPlayerAge(player?.date_of_birth) + " years"
              : "-"}
          </div>
          <div>{player?.height ? `${player.height}cm` : "-"}</div>
          <div>{player?.weight ? `${player?.weight} kg` : "-"}</div>
        </div>
      ) : (
        <div
          className={`flex flex-col gap-1 justify-around h-full ${
            playerNumber === 2 ? "items-end" : ""
          }`}
        >
          <div className="w-[30%] max-w-[50px] h-3 bg-dark rounded-sm"></div>
          <div className="w-[20%] max-w-[35px] h-3 bg-dark rounded-sm"></div>
          <div className="w-[20%] max-w-[35px] h-3 bg-dark rounded-sm"></div>
        </div>
      )}
    </div>
  );
};

export default PlayerDetails;
