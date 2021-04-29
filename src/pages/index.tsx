import { GetStaticProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';

import { api } from "../services/api";
import { Episode, IEpisode } from '../interfaces/episode';
import { convertDatabaseEpisodesToView } from '../conversors/databaseEpisodesToView';

import styles from './home.module.scss';

import { userPlayer } from '../contexts/PlayerContext';
import TimerUtils from '../utils/timer';

type HomeProps = {
  lastestEpisodes: Episode[];
  allEpisodes: Episode[];
}


export default function Home({ allEpisodes, lastestEpisodes }: HomeProps) {

  const { 
    playList,
    currentTitle
  } = userPlayer();

  const episodeList = [...lastestEpisodes, ...allEpisodes];

  const isCurrentPlaying = (title: string) => title === currentTitle;

  return (
    <div className={styles.homepage}>

      <Head>
        <title>Home | Podcastr </title>
      </Head>

      <section className={styles.lastestEpisodes}>
        <h2>Últimos lançamentos</h2>

        <ul>
          {lastestEpisodes.map((episode, index) => {

            return (
              <li key={episode.id}>
                <Image
                  width={192}
                  height={192}
                  src={episode.thumbnail}
                  alt={episode.title}
                  objectFit="cover"
                />

                <div className={styles.episodeDetails}>
                  <Link href={`/episodes/${episode.id}`} >
                    <a>{episode.title}</a>
                  </Link>
                  <p>{episode.members}</p>
                  <span>{episode.publishedAt}</span>
                  <span>{episode.durationAsString}</span>
                </div>

                <button type="button" onClick={() => playList(episodeList, index)} >
                  <img src="/play-green.svg" alt="Tocar episódio" />
                </button>

              </li>
            )

          })}
        </ul>

      </section>


      <section className={styles.allEpisodes}>

        <h2>Todos episódios</h2>

        <table cellSpacing={0}>
          <thead>
            <tr>
              <th></th>
              <th>Podcast</th>
              <th>Integrantes</th>
              <th>Data</th>
              <th>Duração</th>
              <th></th>
            </tr>

          </thead>

          <tbody>

            {allEpisodes.map((episode, index) => (

              <tr 
                key={episode.id} 
                className={isCurrentPlaying(episode.title) ? styles.currentPlaying : ''}
              >
                <td style={{ width: 72 }} >
                  <Image
                    width={120}
                    height={120}
                    src={episode.thumbnail}
                    alt={episode.title}
                    objectFit="cover"
                  />
                </td>

                <td>
                  <Link href={`/episodes/${episode.id}`} >
                    <a>{episode.title}</a>
                  </Link>
                </td>

                <td>{episode.members}</td>
                <td style={{ width: 100 }} >{episode.publishedAt}</td>
                <td>{episode.durationAsString}</td>
                <td>
                  <button type="button">
                    <img 
                      src="/play-green.svg" 
                      alt="Tocar episódio" 
                      onClick={() => playList(episodeList, index + lastestEpisodes.length)}
                    />
                  </button>
                </td>

              </tr>

            ))}

          </tbody>
        </table>

      </section>

    </div>
  )
}



export const getStaticProps: GetStaticProps = async () => {

  const { data } = await api.get<IEpisode[]>('episodes', {
    params: {
      _limit: 12,
      _sort: 'published_at',
      _order: 'desc'
    }
  });

  const episodes = convertDatabaseEpisodesToView(data);
  const lastestEpisodes = episodes.slice(0, 2);
  const allEpisodes = episodes.slice(2, episodes.length)

  return {
    props: {
      lastestEpisodes,
      allEpisodes
    },
    revalidate: TimerUtils.fromHours(1)
  }


}


