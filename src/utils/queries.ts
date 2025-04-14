import api from "./api";
import { PlayerType, Pagination } from "../types/types";

// Define proper types for API responses
type PlayerSearchResponse = {
  data: {
    data: PlayerType[];
    pagination: Pagination;
  };
};

type PlayerDetailsResponse = {
  data: {
    data: PlayerType;
  };
};

type PlayersResponse = {
  data: {
    data: PlayerType[];
    pagination: Pagination;
  };
};

export const getPlayers = async () => {
  try {
    const response = await api.get<PlayersResponse>('/players');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching players:', error);
    throw error;
  }
};

export const getPlayerById = async (player_id: number | null, include: string = '', filters: string = '') => {
  if (!player_id) return null;
  
  try {
    const response = await api.get<PlayerDetailsResponse>(`/players/${player_id}?include=${include}&filters=${filters}`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching player by ID:', error);
    return null; // Return null instead of throwing to handle missing players gracefully
  }
};

export const getPlayerByName = async (player_name: string, page: number = 1) => {
  if (!player_name.trim()) return null;
  
  try {
    const response = await api.get<PlayerSearchResponse>(`/players/search/${player_name}?page=${page}`);
    return {
      data: response.data.data.data,
      pagination: response.data.data.pagination
    };
  } catch (error) {
    console.error("Error fetching player by name:", error);
    return {
      data: null,
      pagination: null
    };
  }
};