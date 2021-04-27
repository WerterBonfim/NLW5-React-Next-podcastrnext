import { createContext } from "react";
import { EpisodePlayer } from "../interfaces/episode";



type PlayerContextData = {
    episodes: EpisodePlayer[];
    currentEpisodeIndex: number;
    play: (episode: EpisodePlayer) => void;
}

export const PlayerContext = createContext({} as PlayerContextData);
