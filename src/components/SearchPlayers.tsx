import React, { useEffect, useRef } from "react";
import { PlayerType, Pagination } from "../types/types";
import { RiFootballFill } from "react-icons/ri";

type props = {
  data: PlayerType[];
  pagination: Pagination | null;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  player1Id: number | null;
  setPlayer1Id: React.Dispatch<React.SetStateAction<number | null>>;
  player2Id: number | null;
  setPlayer2Id: React.Dispatch<React.SetStateAction<number | null>>;
  currentPlayer: number;
  setCurrentPlayer: React.Dispatch<React.SetStateAction<1 | 2>>;
  showPlayers: boolean;
  setShowPlayers: React.Dispatch<React.SetStateAction<boolean>>;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  loading: boolean;
};

const SearchPlayers: React.FC<props> = ({
  data,
  pagination,
  searchTerm,
  setSearchTerm,
  player1Id,
  setPlayer1Id,
  player2Id,
  setPlayer2Id,
  currentPlayer,
  setCurrentPlayer,
  setShowPlayers,
  setPage,
  showPlayers,
  loading,
}) => {
  console.log(currentPlayer);
  console.log(pagination);
  console.log(data);
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (inputRef.current && showPlayers) {
      inputRef.current.focus();
    }
  }, [showPlayers]);

  return (
    <div className="w-full flex flex-col items-center z-40">
      <div className="p-2 w-full bg-dark sticky top-0">
        <input
          type="text"
          placeholder="Enter player name"
          className=" bg-dark-bg w-full rounded-md px-2 py-2 outline-none"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setPage(1);
          }}
          ref={inputRef}
        />
      </div>
      {loading && (
        <div className="animate-spin text-gray-400 py-2">
          <RiFootballFill size={30} />
        </div>
      )}
      {!loading &&
        (searchTerm.trim() === "" ? (
          <div className="text-sm mt-2">Please enter a name</div>
        ) : searchTerm.trim().length < 2 ? (
          <div className="text-sm mt-2">Please enter at least 2 characters</div>
        ) : data.length === 0 ? (
          <div className="text-sm mt-2">No players found</div>
        ) : (
          <div className=" overflow-scroll scroll_bar w-full">
            <div>Players</div>
            <div className="w-full ">
              {data
                .filter((player) => player.id !== player2Id)
                .filter((player) => player.id !== player1Id)
                .map((player) => (
                  <button
                    key={player.id}
                    className="w-full flex items-center gap-4 px-2 py-1 bg-dark-bg cursor-pointer mb-2 first:rounded-t-md last:rounded-b-md outline-none focus:bg-dark-bg/30"
                    onClick={() => {
                      if (currentPlayer === 1 && player.id !== player2Id) {
                        setPlayer1Id(player.id);
                        setCurrentPlayer(2);
                        setShowPlayers(false);
                        setPage(1);
                        setSearchTerm("");
                      } else if (
                        currentPlayer === 2 &&
                        player.id !== player1Id
                      ) {
                        setPlayer2Id(player.id);
                        setCurrentPlayer(1);
                        setShowPlayers(false);
                        setPage(1);
                        setSearchTerm("");
                      }
                    }}
                  >
                    <div className="h-6 w-6 rounded-full overflow-clip">
                      <img src={`${player.image_path}`} alt="" className=" " />
                    </div>
                    <div className=" text-[12px]">{player.display_name}</div>
                  </button>
                ))}
            </div>
            {pagination?.has_more && (
              <div>
                <button
                  onClick={() => {
                    if (pagination.has_more) {
                      setPage((prevPage) => prevPage + 1);
                    }
                  }}
                  className="mt-2 bg-dark-bg text-sm rounded-md px-2 py-1 hover:bg-gray-600/20 transition-all duration-200"
                  disabled={!pagination.has_more}
                >
                  Next Page
                </button>
              </div>
            )}
          </div>
        ))}
    </div>
  );
};

export default SearchPlayers;
