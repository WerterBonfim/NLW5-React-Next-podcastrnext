import '../styles/global.scss'

import { Header } from '../Components/Header'
import { Player } from '../Components/Player';

import styles from '../styles/app.module.scss';
import { PlayerContext, PlayerContextProvider } from '../contexts/PlayerContext';
import React from 'react';
import { EpisodePlayer } from '../interfaces/episode';

function MyApp({ Component, pageProps }) {

  

  return (
    <PlayerContextProvider>
      <div className={styles.wrapper}>
        <main>
          <Header />
          <Component {...pageProps} />
        </main>
        <Player />
      </div>
    </PlayerContextProvider>
  );

}

export default MyApp
