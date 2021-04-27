import { format, parseISO } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { Episode, IEpisode } from "../interfaces/episode";
import { convertDurationToTimeString } from "../utils/convertDurationToTimeString";

export function convertDatabaseEpisodesToView(data: IEpisode[]): Episode[] {

    const episodes = data.map(convertDatabaseEpisodeToView)
    return episodes;
}

export function convertDatabaseEpisodeToView(data: IEpisode): Episode {

    return {
        id: data.id,
        title: data.title,
        thumbnail: data.thumbnail,
        members: data.members,
        publishedAt: format(parseISO(data.published_at.toString()), 'd MMM yy', { locale: ptBR }),
        duration: Number(data.file.duration),
        durationAsString: convertDurationToTimeString(Number(data.file.duration)),
        description: data.description,
        url: data.file.url
    } as Episode

}
