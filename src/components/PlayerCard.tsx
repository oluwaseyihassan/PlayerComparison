import React, { useEffect, useState } from "react";
import { PlayerType, TeamType } from "../types/types";
import { player_placeholder } from "../assets/placeholder";
import { MdOutlineSwapHorizontalCircle } from "react-icons/md";

type PlayerCardProps = {
  player: PlayerType | null;
  playerNumber: 1 | 2;
  setShowPlayers: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentPlayer: React.Dispatch<React.SetStateAction<1 | 2>>;
  style?: string;
};

const PlayerCard: React.FC<PlayerCardProps> = ({
  player,
  playerNumber,
  setCurrentPlayer,
  setShowPlayers,
  style,
}) => {
  const [currentClub, setCurrentClub] = useState<TeamType | null>(null);

  useEffect(() => {
    const getCurrentClub = (): TeamType | null => {
      if (!player || !player.teams?.length) return null;

      const activeTeam = player.teams.find((team) => {
        const isDomestic = team.team?.type === "domestic";
        // const isActive = team.end && new Date(team.end) > new Date();
        return isDomestic && team.team?.founded;
      });

      return activeTeam?.team || null;
    };

    setCurrentClub(getCurrentClub());
  }, [player]);
  return (
    <div className={`${style}`}>
      <div className="flex flex-col justify-center items-center mb-2 bg-dark-bg rounded-md p-2 text-center relative h-full ">
        {player && (
          <div className="flex flex-col gap-2 items-center">
            <button
              className="absolute right-1 top-1 bg-dark-bg rounded-full p-1 cursor-pointer text-gray-300"
              onClick={() => {
                setShowPlayers(true);
                setCurrentPlayer(playerNumber);
              }}
              title={`Change ${playerNumber === 1 ? "Player 1" : "Player 2"}`}
            >
              <MdOutlineSwapHorizontalCircle />
            </button>
            <div className="h-10 w-10 rounded-full bg-dark-bg flex justify-center items-center overflow-hidden">
              <img
                src={`${player?.image_path || player_placeholder.image}`}
                alt="Player"
                className="h-9 w-9 rounded-full"
              />
            </div>
            <div className="text-sm sm:text-base">
              {player?.display_name || "Unknown Player"}
            </div>
            <div className="text-sm text-gray-400">
              {currentClub ? (
                <div className="flex gap-1 items-center">
                  <div className="h-5 w-5 rounded-full overflow-hidden">
                    <img
                      src={`${
                        currentClub.image_path ||
                        "https://cdn.sportmonks.com/images/soccer/team_placeholder.png"
                      }`}
                      className="h-5"
                      alt=""
                    />
                  </div>
                  <span>{currentClub.name}</span>
                </div>
              ) : (
                <span>No current club</span>
              )}
            </div>
          </div>
        )}
        {!player && (
          <>
            <img src={player_placeholder.image} className="h-7" alt="" />
            <button
              onClick={() => {
                setShowPlayers(true);
                setCurrentPlayer(playerNumber);
              }}
              className="cursor-pointer"
            >
              Select player
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default PlayerCard;
