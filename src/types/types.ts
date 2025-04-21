export type TeamType = {
    country_id: number | null;
    founded: number | null;
    gender: string | null;
    id: number | null;
    image_path: string | null;
    last_played_at: string | null;
    name: string | null;
    placeholder: boolean | null;
    short_code: string | null;
    sport_id: number | null;
    type: string | null;
    venue_id: number | null;
};

export type TeamsType = {
    captain: boolean | null;
        end: string | null;
        jersey_number: number | null;
        player_id: number | null;
        position_id: number | null;
        start: string | null;
        team: TeamType | null;
        team_id: number | null;
        transfer_id: number | null;
}

export type PlayerType = {
    city_id: number | null;
    common_name: string | null;
    country_id: number | null;
    date_of_birth: string | null;
    detailed_position_id: number | null;
    display_name: string | null;
    firstname: string | null;
    gender: string | null;
    height: number | null;
    id: number | null;
    image_path: string | null;
    lastname: string | null;
    name: string | null;
    nationality_id: number | null;
    position_id: number | null;
    sport_id: number | null;
    type_id: number | null;
    weight: number | null;
    teams: TeamsType[] | null;
    statistics: StatisticsType[] | null;
};

export interface Pagination {
    count: number | null;
    per_page: number | null;
    current_page: number;
    next_page: string | null;
    has_more: boolean | null;
};

export type StatisticsType = {
    id: number | null;
    jersey_number: number | null;
    season_id: number | null;
    season: SeasonType | null;
    has_values: boolean | null;
    team: {
        name: string | null;
        image_path: string | null;
    },
    details: {
        type_id: number | null;
        player_statistic_id: number | null;
        id: number | null;
        value: {
            total: number | null;
            goals: string | null;
            penalties: number | null;
            home: number | null;
            away: number | null;

        } | null;
        type: {
            name: string | null;
            code: string | null;
            developer_name: string | null;
            medel_type: string | null;
            stat_group: string | null;
        } | null;
    }[] | null;

}

export type SeasonType = {
    name: string | null;
    is_current: boolean | null;
    id: number | null;
    league: LeagueType | null;
}

export type LeagueType = {
    id: number | null;
    name: string | null;
    active: boolean | null;
    image_path: string | null;
    type: string | null;
    sub_type: string | null;
}