import { useContext, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Slider from 'rc-slider';

import 'rc-slider/assets/index.css';

import { PlayerContext } from '../../contexts/PlayerContext';

import styles from './styles.module.scss';
import { convertDurationToTimeString } from '../../utils/convertDurationToTimeString';

export function Player() {

    const audioRef = useRef<HTMLAudioElement>(null);
    const [progress, setProgress] = useState(0);

    const {
        episodes,
        currentEpisodeIndex,
        isPlaying,
        togglePlay,
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
    } = useContext(PlayerContext);

    const episode = episodes[currentEpisodeIndex];

    useEffect(() => {

        if (!audioRef.current)
            return;

        isPlaying
            ? audioRef.current.play()
            : audioRef.current.pause();



    }, [isPlaying]);


    function setupProgressListener() {
        audioRef.current.currentTime = 0;

        audioRef.current.addEventListener('timeupdate', () => {
            setProgress(Math.floor(audioRef.current.currentTime));
        });
    }

    function handlerSeek(amount: number) {

        audioRef.current.currentTime = amount;
        setProgress(amount);

    }

    function handlerEpisodeEnded() {
        if (hasNext)
            playNext();
        else
            clearPlayerState();
    }



    return (
        <>

            {episode && (

                <audio
                    src={episode.url}
                    autoPlay
                    ref={audioRef}
                    onPlay={() => setPlayingState(true)}
                    onPause={() => setPlayingState(false)}
                    loop={isLooping}
                    onLoadedMetadata={setupProgressListener}
                    onEnded={handlerEpisodeEnded}
                />

            )}

            <div className={styles.playerContainer}>

                <header>
                    <img src="./playing.svg" alt="Tocando agora" />
                    <strong>Tocando agora</strong>
                </header>


                {episode ? (
                    <div className={styles.currentEpisode}>
                        <Image
                            width={592}
                            height={592}
                            src={episode.thumbnail}
                            objectFit="cover"
                        />

                        <strong>{episode.title}</strong>
                        <span>{episode.members}</span>

                    </div>

                ) : (

                    <div className={styles.emptyPlayer}>
                        <strong>Selecione um podcast para ouvir</strong>
                    </div>

                )}


                <footer className={!episode ? styles.empty : ''}>

                    <div className={styles.progress}>
                        <span>{convertDurationToTimeString(progress)}</span>
                        <div className={styles.slider}>


                            {episode ? (
                                <Slider
                                    max={episode.duration}
                                    value={progress}
                                    onChange={handlerSeek}
                                    trackStyle={{ backgroundColor: '#04d361' }}
                                    railStyle={{ backgroundColor: '#9f75ff' }}
                                    handleStyle={{ borderColor: '#04d361', borderWidth: 4 }}
                                />

                            ) : (
                                <div className={styles.emptySlider}></div>
                            )}


                        </div>
                        <span>{convertDurationToTimeString(episode?.duration ?? 0)}</span>
                    </div>



                    <div className={styles.buttons}>

                        <button
                            type="button"
                            disabled={!episode || episodes.length === 1}
                            onClick={toggleShuffle}
                            className={isShuffling ? styles.isActive : ''}
                        >
                            <img src="./shuffle.svg" alt="Embaralhar" />
                        </button>

                        <button
                            type="button"
                            disabled={!episode || !hasPrevious}
                            onClick={playPrevious}
                        >
                            <img
                                src="./play-previous.svg"
                                alt="Tocar enterior"

                            />
                        </button>

                        <button
                            type="button"
                            className={styles.playButton}
                            disabled={!episode}
                            onClick={togglePlay}
                        >

                            {isPlaying
                                ? <img src="./pause.svg" alt="Pausar" />
                                : <img src="./play.svg" alt="Tocar" />
                            }

                        </button>

                        <button type="button" disabled={!episode || !hasNext}>
                            <img
                                src="./play-next.svg"
                                alt="Tocar próxima"
                                onClick={playNext}
                            />
                        </button>
                        <button
                            type="button"
                            disabled={!episode}
                            className={isLooping ? styles.isActive : ''}
                        >
                            <img
                                src="./repeat.svg"
                                alt="Repetir"
                                onClick={toggleLoop}
                            />
                        </button>
                    </div>

                </footer>

            </div>
        </>
    );
}
