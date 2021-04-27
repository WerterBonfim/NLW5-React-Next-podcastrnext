import { createContext } from "react";
import { EpisodePlayer } from "../interfaces/episode";



type PlayerContextData = {
    episodes: EpisodePlayer[];
    currentEpisodeIndex: number;
    isPlaying: boolean;
    play: (episode: EpisodePlayer) => void;
    togglePlay: () => void;
    setPlayingState: (state: boolean) => void;
}

export const PlayerContext = createContext({} as PlayerContextData);
