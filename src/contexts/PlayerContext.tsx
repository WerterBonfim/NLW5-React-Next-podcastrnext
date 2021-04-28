import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { Episode, EpisodePlayer } from "../interfaces/episode";



type PlayerContextData = {
    episodes: EpisodePlayer[];
    currentTitle: string;
    currentEpisodeIndex: number;
    isPlaying: boolean;
    play: (episode: EpisodePlayer) => void;
    playList: (list: Episode[], index: number) => void;
    togglePlay: () => void;
    playNext: () => void;
    playPrevious: () => void;
    setPlayingState: (state: boolean) => void;
    hasNext: boolean;
    hasPrevious: boolean;
    isLooping: boolean;
    toggleLoop: () => void;
    isShuffling: boolean;
    toggleShuffle: () => void;
    clearPlayerState: () => void;
}

export const PlayerContext = createContext({} as PlayerContextData);

type PlayerContextProviderProps = {
    children: ReactNode
}

export function PlayerContextProvider({ children }: PlayerContextProviderProps) {

    const [episodes, setEpisodes] = useState<EpisodePlayer[]>([]);
    const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLooping, setIsLooping] = useState(false);
    const [isShuffling, setisShuffling] = useState(false);
    const [currentTitle, setCurrentTitle] = useState<string>('')

    useEffect(() => {

        setCurrentTitle(episodes[currentEpisodeIndex]?.title ?? '');

    }, [currentEpisodeIndex])

    function play(episode: EpisodePlayer) {
        setEpisodes([episode]);
        setCurrentEpisodeIndex(0);
        setIsPlaying(true);
        
    }

    function playList(list: Episode[], index: number): void {
        setEpisodes(list);
        setCurrentEpisodeIndex(index);
        setIsPlaying(true)
    }

    function togglePlay() {
        setIsPlaying(!isPlaying)
    }

    function toggleLoop() {
        setIsLooping(!isLooping);
    }

    function toggleShuffle() {
        setisShuffling(!isShuffling);
    }

    function setPlayingState(state: boolean) {
        setIsPlaying(state);
    }

    function playNextShufflerEpisode() {
        const newEpisodeIndex = Math.floor(Math.random() * episodes.length);
        setCurrentEpisodeIndex(newEpisodeIndex);
    }

    function clearPlayerState() {
        setEpisodes([]);
        setCurrentEpisodeIndex(0);
    }


    const hasPrevious = currentEpisodeIndex > 0;
    const hasNext = isShuffling || (currentEpisodeIndex + 1) < episodes.length;

    function playNext() {

        if (isShuffling) {
            playNextShufflerEpisode();
            return;
        }

        if (hasNext)
            setCurrentEpisodeIndex(currentEpisodeIndex + 1);
    }

    function playPrevious() {

        if (isShuffling) {
            playNextShufflerEpisode();
            return;
        }

        if (hasPrevious)
            setCurrentEpisodeIndex(currentEpisodeIndex - 1);
    }



    return (
        <PlayerContext.Provider value={{
            episodes,
            currentTitle,
            currentEpisodeIndex,
            play,
            isPlaying,
            togglePlay,
            playList,
            setPlayingState,
            playNext,
            playPrevious,
            hasNext,
            hasPrevious,
            isLooping,
            toggleLoop,
            isShuffling,
            toggleShuffle,
            clearPlayerState

        }}
        >

            {children}

        </PlayerContext.Provider>
    )

}

export const userPlayer = () => {
    return useContext(PlayerContext);
}
