import { GetStaticProps } from 'next';
import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { api } from "../services/api";
import { convertDurationToTimeString } from '../utils/convertDurationToTimeString';


type File = {
  url: string;
  type: string;
  duration: number
}

type Episode = {
  id: string;
  title: string;
  members: string;
  thumbnail: string;
  published_at: string;
  description: string;
  file: File;
}

type HomeProps = {
  episodes: Episode[]
}


export default function Home(props: HomeProps) {

  return (
    <div>
      <h1>Pagina inicial</h1>
      <p>{JSON.stringify(props.episodes)}</p>
    </div>
  )
}


export const getStaticProps: GetStaticProps = async () => {

  const { data } = await api.get<Episode[]>('episodes', {
    params: {
      _limit: 12,
      _sort: 'published_at',
      _order: 'desc'
    }
  });

  const episodes = data.map(episode => {
    return {
      id: episode.id,
      title: episode.title,
      thumbnail: episode.thumbnail,
      members: episode.members,
      publishAt: format(parseISO(episode.published_at), 'd MM yy', { locale: ptBR }),
      duration: Number(episode.file.duration),
      durationAsString: convertDurationToTimeString(Number(episode.file.duration)),
      description: episode.description,
      url: episode.file.url
    }
  })



  return {
    props: {
      episodes: episodes
    },
    //revalidate: 60 * 60 * 8
  }


} 
