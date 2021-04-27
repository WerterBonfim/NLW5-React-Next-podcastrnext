import '../styles/global.scss'

import { Header } from '../Components/Header'
import { Player } from '../Components/Player';

import styles from '../styles/app.module.scss';
import { PlayerContext } from '../contexts/PlayerContext';
import { useState } from 'react';
import { EpisodePlayer } from '../interfaces/episode';

function MyApp({ Component, pageProps }) {

  const [episodes, setEpisodes] = useState<EpisodePlayer[]>([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);

  function play(episode) {
    setEpisodes([episode]);
    setCurrentEpisodeIndex(0);
  }

  return (
    <PlayerContext.Provider value={{ episodes, currentEpisodeIndex, play}}>
      <div className={styles.wrapper}>
        <main>
          <Header />
          <Component {...pageProps} />
        </main>
        <Player />
      </div>
    </PlayerContext.Provider>
  );

}

export default MyApp
