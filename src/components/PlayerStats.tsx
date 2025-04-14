import React, { useEffect, useState, useMemo } from "react";
import { PlayerType, StatisticsType } from "../types/types";

type PlayerStatsProps = {
  playerStats: PlayerType | null;
  style?: string;
  statsList: string[] | null;
  playerNumber: 1 | 2;
};

const PlayerStats: React.FC<PlayerStatsProps> = ({
  playerStats,
  style,
  statsList,
}) => {
  const [stats, setStats] = useState<StatisticsType["details"]>(null);


  useEffect(() => {
    const statistics = playerStats?.statistics?.find(
      (stat) => (stat.details?.length ?? 0) > 0
    );

    const filteredStats =
      statistics?.details?.filter(
        (stat) =>
          stat?.type?.developer_name &&
          statsList?.includes(stat.type.developer_name)
      ) || null;

    setStats(filteredStats);
  }, [playerStats, statsList]);

  const statsMap = useMemo(() => {
    const map = new Map();
    stats?.forEach((stat) => {
      if (stat.type?.developer_name) {
        map.set(stat.type.developer_name, stat.value?.total || 0);
      }
    });
    return map;
  }, [stats]);
  console.log(playerStats)


  return (
    <div className={`${style} flex flex-col gap-2 text-white justify-center`}>
      {/* <div className="text-sm text-gray-400">
        <div className="h-6 w-6 rounded-full bg-dark-bg flex justify-center items-center overflow-hidden">
      <img src={`${playerStats?.statistics?.[0]?.team?.image_path}`} alt="" />
        </div>
      </div>
        <div>

        {playerStats?.statistics?.[0]?.team?.name || "-"}
        </div> */}
      {!statsList || statsList.length === 0 ? (
        <>
          <div>-</div>
          <div>-</div>
        </>
      ) : (
        statsList.map((statName) => {
          const value = statsMap.get(statName) ?? 0;
          // const isHigher = isHigherStat(statName);

          return (
            <div
              key={statName}
              className="text-gray-400"
            >
              <div>{value}</div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default PlayerStats;
