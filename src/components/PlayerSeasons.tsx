import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import CustomDropdown from "../utils/CustomDropdown";
import { PlayerType } from "../types/types";

type PlayerSeasonProps = {
  player: PlayerType | null;
  setPlayerSeasonId: Dispatch<SetStateAction<number | null>>;
  style: string;
  dropDownStyle?: string;
  side?: string;
  dropDownOpen?: boolean;
}

const PlayerSeasons: FC<PlayerSeasonProps> = ({
  player,
  style,
  setPlayerSeasonId,
  dropDownStyle,
  side,
  dropDownOpen
}) => {
  const [selectedSeason, setSelectedSeason] = useState<{
    name: string;
    id: number | null;
    league_image_path: string;
    league_name: string;
    league_id: number | null;
  } | null>(null);

  const seasonOptions =
    player?.statistics?.filter((stat) => stat.has_values).map((stat) => ({
      id: stat.season?.id || null,
      name: stat.season?.name || "Unknown Season",
      league_image_path: stat.season?.league?.image_path || "",
        league_name: stat.season?.league?.name || "Unknown League",
      league_id: stat.season?.league?.id || null,
    })) || [];

  useEffect(() => {
    const defaultSeason =
      player?.statistics?.find(
        (stat) =>
          (stat.season?.is_current && stat.season?.league?.sub_type === "domestic")
      )?.season || player?.statistics?.[0]?.season;

    if (defaultSeason) {
      setSelectedSeason({
        name: defaultSeason.name || "Unknown Season",
        id: defaultSeason.id || null,
        league_image_path: defaultSeason.league?.image_path || "",
        league_name: defaultSeason.league?.name || "Unknown League",
        league_id: defaultSeason.league?.id || null,
      });
    }
  }, [player]);

  useEffect(() => {
    if (selectedSeason?.id) {
      setPlayerSeasonId(selectedSeason.id);
    }
  }, [selectedSeason, setPlayerSeasonId]);

  return (
    <div className={`${style} text-white`}>
      <div className=" relative h-full">
          <CustomDropdown
            options={seasonOptions}
            selected={selectedSeason}
            setSelected={setSelectedSeason}
            dropDownStyle={dropDownStyle}
            side={side}
            dropDownOpen={dropDownOpen}
          />
      </div>
    </div>
  );
};

export default PlayerSeasons;
