import { GetStaticProps } from 'next';
import Image from 'next/image';

import { api } from "../services/api";
import { Episode, IEpisode } from '../interfaces/episode';
import { convertDatabaseEpisodeToView } from '../conversors/databaseEpisodesToView';

import styles from './home.module.scss';

type HomeProps = {
  lastestEpisodes: Episode[];
  allEpisodes: Episode[];
}


export default function Home({ allEpisodes, lastestEpisodes }: HomeProps) {

  return (
    <div className={styles.homepage}>

      <section className={styles.lastestEpisodes}>
        <h2>Últimos lançamentos</h2>
        
        <ul>
          {lastestEpisodes.map(episode => {

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
                  <a href="">{episode.title}</a>
                  <p>{episode.members}</p>
                  <span>{episode.publishedAt}</span>
                  <span>{episode.durationAsString}</span>
                </div>

                <button type="button">
                  <img src="/play-green.svg" alt="Tocar episódio"/>
                </button>

              </li>
            )

          })}
        </ul>

      </section>


      <section className={styles.allEpisodes}>

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

  const episodes = convertDatabaseEpisodeToView(data);
  const lastestEpisodes = episodes.slice(0, 2);
  const allEpisodes = episodes.slice(2, episodes.length)

  return {
    props: {
      lastestEpisodes,
      allEpisodes
    },
    //revalidate: 60 * 60 * 8
  }


}


