import React from "react";
import { PlayerType } from "../types/types";

type PlayerProps = {
  style: string;
  playerNumber: number;
  player: PlayerType | null;
  setShowPlayers: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentPlayer: React.Dispatch<React.SetStateAction<number>>;
};

const Player: React.FC<PlayerProps> = ({

}) => {
  

  return (
<></>
  );
};

export default Player;
