import { useQuery } from "@tanstack/react-query";
import { getPlayerByName, getPlayerById } from "./utils/queries";
import { useEffect, useState } from "react";
import { PlayerType, Pagination } from "./types/types";
import SearchPlayers from "./components/SearchPlayers";
import useDebounce from "./Hooks/useDebounce";
import PlayerCard from "./components/PlayerCard";
import PlayerDetails from "./components/PlayerDetails";
import PlayerSeasons from "./components/PlayerSeasons";
import PlayerStats from "./components/PlayerStats";
import { useDropdownContext } from "./Context/Context";
import useAnimationCleanup from "./Hooks/useAnimationCleanup";

type DataTypes = {
  data: PlayerType[] | null;
  pagination: Pagination | null;
} | null;

type PlayerTypes = {
  player: { data: PlayerType | null } | null;
};

function App() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [player1Id, setPlayer1Id] = useState<number | null>(null);
  const [player1SeasonId, setPlayer1SeasonId] = useState<number | null>(null);
  const [player2SeasonId, setPlayer2SeasonId] = useState<number | null>(null);
  const [player2Id, setPlayer2Id] = useState<number | null>(null);
  const [currentPlayer, setCurrentPlayer] = useState<1 | 2>(1);
  const [showPlayers, setShowPlayers] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const { isOpen, closeDropdown, side } = useDropdownContext();
  const { isVisible } = useAnimationCleanup(showPlayers, 300);
  // const { setItem, getItem, removeItem } = useLocalStorage();

  const { data, isLoading: playerSearchByNameIsLoading } = useQuery<DataTypes>({
    queryKey: ["players", debouncedSearchTerm, page],
    queryFn: () => getPlayerByName(debouncedSearchTerm, page) || null,
    enabled: debouncedSearchTerm.trim().length >= 2,
    refetchOnWindowFocus: false,
  });

  const { data: player1 } = useQuery<PlayerTypes["player"]>({
    queryKey: ["player1", player1Id],
    queryFn: () =>
      getPlayerById(
        player1Id,
        "teams.team;statistics.season.league;statistics.details.type",
        ""
      ) || null,
    enabled: !!player1Id,
    refetchOnWindowFocus: false,
  });

  const { data: player2 } = useQuery<PlayerTypes["player"]>({
    queryKey: ["player2", player2Id],
    queryFn: () =>
      getPlayerById(
        player2Id,
        "teams.team;statistics.season.league;statistics.details.type",
        ""
      ) || null,
    enabled: !!player2Id,
    refetchOnWindowFocus: false,
  });

  const { data: player1Stats } = useQuery<PlayerTypes["player"]>({
    queryKey: ["player1Season", player1Id, player1SeasonId],
    queryFn: () =>
      getPlayerById(
        player1Id,
        "teams.team;statistics.season.league;statistics.details.type;statistics.team",
        `playerStatisticSeasons:${player1SeasonId}`
      ) || null,
    enabled: !!player1Id && player1SeasonId !== null,
    refetchOnWindowFocus: false,
  });

  const { data: player2Stats } = useQuery<PlayerTypes["player"]>({
    queryKey: ["player2Season", player2Id, player2SeasonId],
    queryFn: () =>
      getPlayerById(
        player2Id,
        "teams.team;statistics.season.league;statistics.details.type;statistics.team",
        `playerStatisticSeasons:${player2SeasonId}`
      ) || null,
    enabled: !!player2Id && player2SeasonId !== null,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    console.log(player1Stats);
  }, [player1Stats]);
  useEffect(() => {
    console.log(player2Stats);
  }, [player2Stats]);

  const getCurrentClub = (player: PlayerType | null) => {
    if (!player) return null;
    console.log(player);
    if (player?.teams?.length === 0) return null;
    const currentClub = player?.teams?.find((team) => {
      const is_domestic = team.team?.type === "domestic";
      const is_active = team.end ? new Date(team.end) > new Date() : false;
      return is_domestic && is_active;
    });
    return currentClub ? currentClub.team : "No current club";
  };

  getCurrentClub(player1?.data || null);
  getCurrentClub(player2?.data || null);

  console.log("Player 1:", player1);
  console.log("Player 2:", player2);
  console.log(data);

  return (
    <div className={` min-h-screen mx-auto p-4 bg-dark text-white`}>
      <div
        className={`${
          showPlayers || isOpen ? "block" : "hidden"
        } w-full h-full fixed top-0 right-0 z-10 ${showPlayers ? "" : ""}`}
        onClick={() => {
          setShowPlayers(false);
          closeDropdown();
        }}
      ></div>
      <div className="text-center text-2xl mb-3 font-bold">
        Player Comparison
      </div>
      <div className={` max-w-[1280px] m-auto`}>
        {isVisible && (
          <div
            className={`${
              showPlayers
                ? "animate-fade-in opacity-100"
                : "animate-fade-out opacity-0 pointer-events-none"
            } h-fit max-h-[500px] flex flex-col items-center px-4 pb-2 left-[50%] translate-x-[-50%] z-40 absolute bg-dark rounded-md w-[80%] max-w-[400px] overflow-scroll scroll_bar`}
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                setShowPlayers(false);
              }
            }}
          >
            <SearchPlayers
              data={data?.data || []}
              pagination={data?.pagination || null}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              player1Id={player1Id}
              setPlayer1Id={setPlayer1Id}
              player2Id={player2Id}
              setPlayer2Id={setPlayer2Id}
              currentPlayer={currentPlayer}
              setCurrentPlayer={setCurrentPlayer}
              showPlayers={showPlayers}
              setShowPlayers={setShowPlayers}
              page={page}
              setPage={setPage}
              loading={playerSearchByNameIsLoading}
            />
          </div>
        )}
        <div
          className={`${
            showPlayers ? "blur-sm" : ""
          } flex flex-col justify-between items-center mb-4 gap-5`}
        >
          <div className="grid grid-cols-2 gap-4 w-full">
            <PlayerCard
              style={`col-span-1 `}
              player={player1?.data || null}
              playerNumber={1}
              setShowPlayers={setShowPlayers}
              setCurrentPlayer={setCurrentPlayer}
            />
            <PlayerCard
              style={`col-span-1 text-right `}
              player={player2?.data || null}
              playerNumber={2}
              setShowPlayers={setShowPlayers}
              setCurrentPlayer={setCurrentPlayer}
            />
          </div>

          <div className="grid grid-cols-2 gap-4 w-full justify-between min-h-[50px]">
            <div className="h-full bg-dark-bg rounded-md">
              {player1 ? (
                <PlayerSeasons
                  style={`col-span-1 h-full`}
                  side={`left`}
                  dropDownOpen={isOpen && side === "left"}
                  dropDownStyle={`absolute top-0 left-0`}
                  player={player1?.data}
                  setPlayerSeasonId={setPlayer1SeasonId}
                />
              ) : (
                <div className="flex gap-2 items-center h-full px-2">
                  <div className="h-4 w-4 bg-dark rounded-full"></div>
                  <div className="flex flex-col gap-2 w-4/5">
                    <div className="h-3 rounded-sm w-2/3 bg-dark"></div>
                    <div className="h-3 w-1/2 rounded-sm bg-dark"></div>
                  </div>
                </div>
              )}
            </div>
            <div className="h-full bg-dark-bg rounded-md">
              {player2 ? (
                <PlayerSeasons
                  style={`col-span-1 h-full`}
                  side={`right`}
                  dropDownOpen={isOpen && side === "right"}
                  dropDownStyle={`absolute top-0 right-0`}
                  player={player2?.data}
                  setPlayerSeasonId={setPlayer2SeasonId}
                />
              ) : (
                <div className="flex gap-2 items-center h-full px-2">
                  <div className="h-4 w-4 bg-dark rounded-full"></div>
                  <div className="flex flex-col gap-2 w-4/5">
                    <div className="h-3 rounded-sm w-2/3 bg-dark"></div>
                    <div className="h-3 w-1/2 rounded-sm bg-dark"></div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="grid grid-cols-3 items gap-4 w-full bg-dark-bg rounded-md p-3">
            <div className={`col-span-1`}>
              <PlayerDetails style={``} player={player1?.data || null} />
            </div>
            <div className="text-center col-span-1">
              <div>Age</div>
              <div>Height</div>
              <div>Weight</div>
            </div>
            <div className="">
              <PlayerDetails
                style={`text-right `}
                player={player2?.data || null}
              />
            </div>
          </div>
          <div className="grid grid-cols-5 gap-4 w-full bg-dark-bg rounded-md p-3">
            <div className="flex items-center gap-1">
              <div className="h-5 w-5 flex items-center justify-center">
                <img
                  src={`${player1Stats?.data?.statistics?.[0]?.team?.image_path}`}
                  alt=""
                  className="h-4"
                />
              </div>
              <div className="text-xs">
                {player1Stats?.data?.statistics?.[0]?.team?.name || ""}
              </div>
            </div>
            <div className="col-span-3 text-center  pb-1">
              Top Stats
            </div>
            <div className="col-span-1 flex justify-end items-center gap-1">
              <div className="text-xs">
                {player2Stats?.data?.statistics?.[0]?.team?.name || ""}
              </div>
              <div className="h-5 w-5 flex items-center justify-center">
                <img
                  src={`${player2Stats?.data?.statistics?.[0]?.team?.image_path}`}
                  alt=""
                  className="h-4"
                />
              </div>
            </div>
            <div className="col-span-1 border-dark">
              <PlayerStats
                playerStats={player1Stats?.data || null}
                style={``}
                statsList={[
                  "MINUTES_PLAYED",
                  "APPEARANCES",
                  "YELLOWCARDS",
                  "REDCARDS",
                ]}
                playerNumber={1}
              />
            </div>
            <div className="text-center flex flex-col gap-2 text-white col-span-3">
              <div>Minutes Played</div>
              <div>Appearances</div>
              <div>Yellow Cards</div>
              <div>Red Cards</div>
            </div>
            <div className="col-span-1">
              <PlayerStats
                playerStats={player2Stats?.data || null}
                style={`text-right`}
                statsList={[
                  "MINUTES_PLAYED",
                  "APPEARANCES",
                  "YELLOWCARDS",
                  "REDCARDS",
                ]}
                playerNumber={2}
              />
            </div>
          </div>
          <div className="grid grid-cols-5 gap-4 w-full bg-dark-bg rounded-md p-3">
            <div className=" col-span-5 text-center border-b border-dark pb-1">
              Attacking
            </div>
            <div className="col-span-1">
              <PlayerStats
                playerStats={player1Stats?.data || null}
                style={``}
                statsList={["GOALS", "ASSISTS"]}
                playerNumber={1}
              />
            </div>
            <div className="text-center flex flex-col gap-2 text-white col-span-3">
              <div>Goals</div>
              <div>Assists</div>
            </div>
            <div className="col-span-1">
              <PlayerStats
                playerStats={player2Stats?.data || null}
                style={`text-right`}
                statsList={["GOALS", "ASSISTS"]}
                playerNumber={2}
              />
            </div>
          </div>
          <div className="grid grid-cols-5 gap-4 w-full bg-dark-bg rounded-md p-3">
            <div className=" col-span-5 text-center border-b border-dark pb-1">
              Defensive
            </div>
            <div className="col-span-1">
              <PlayerStats
                playerStats={player1Stats?.data || null}
                style={``}
                statsList={["GOALS_CONCEDED", "CLEANSHEET"]}
                playerNumber={1}
              />
            </div>
            <div className="text-center flex flex-col gap-2 text-white col-span-3">
              <div>Goals Conceded</div>
              <div>Cleansheets</div>
            </div>
            <div className="col-span-1">
              <PlayerStats
                playerStats={player2Stats?.data || null}
                style={`text-right`}
                statsList={["GOALS_CONCEDED", "CLEANSHEET"]}
                playerNumber={2}
              />
            </div>
          </div>
        </div>
      </div>
      <footer className="text-center text-xs">Powered by SportMonks API</footer>
    </div>
  );
}

export default App;
