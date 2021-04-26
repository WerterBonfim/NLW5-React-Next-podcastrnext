import { format, parseISO } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { Episode, IEpisode } from "../interfaces/episode";
import { convertDurationToTimeString } from "../utils/convertDurationToTimeString";

export function convertDatabaseEpisodeToView(data: IEpisode[]): Episode[] {

    const episodes = data.map(episode => {
        return {
            id: episode.id,
            title: episode.title,
            thumbnail: episode.thumbnail,
            members: episode.members,
            publishedAt: format(parseISO(episode.published_at.toString()), 'd MM yy', { locale: ptBR }),
            duration: Number(episode.file.duration),
            durationAsString: convertDurationToTimeString(Number(episode.file.duration)),
            description: episode.description,
            url: episode.file.url
        } as Episode
    })

    return episodes;
}
