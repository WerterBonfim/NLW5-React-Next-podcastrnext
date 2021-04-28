import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';

import Link from 'next/link';
import Image from 'next/image';

import { api } from '../../services/api';

import { convertDatabaseEpisodeToView } from '../../conversors/databaseEpisodesToView';
import { Episode, IEpisode } from '../../interfaces/episode';
import TimerUtils from '../../utils/timer';

import styles from './episode.module.scss';
import { userPlayer } from '../../contexts/PlayerContext';

type EpisodesProps = {
    episode: Episode;
}

export default function Episodes({ episode }: EpisodesProps) {
    
    const {
        play
    } = userPlayer();

    return (
        <div className={styles.episode}>
            <div className={styles.thumbnailContainer}>
                <Link href="/">
                    <button type="button">
                        <img src="/arrow-left.svg" alt="Voltar" />
                    </button>
                </Link>
                <Image
                    width={700}
                    height={160}
                    src={episode.thumbnail}
                    objectFit="cover"
                />
                <button type="button">
                    <img 
                        src="/play.svg" 
                        alt="Tocar episódio" 
                        onClick={() => play(episode)}
                    />
                </button>
            </div>

            <header>
                <h1>{episode.title}</h1>
                <span>{episode.members}</span>
                <span>{episode.publishedAt}</span>
                <span>{episode.durationAsString}</span>
            </header>

            <div
                className={styles.description}
                dangerouslySetInnerHTML={{ __html: episode.description }}
            />

        </div>
    )

}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: 'blocking'
    }
}

export const getStaticProps: GetStaticProps = async (ctx) => {

    console.log('ctx', ctx)

    const { slug } = ctx.params;

    const { data } = await api.get<IEpisode>(`/episodes/${slug}`);

    const episode = convertDatabaseEpisodeToView(data);

    console.log('episode', episode)

    return {
        props: {
            episode
        },
        revalidate: TimerUtils.fromHours(24)
    }

}
