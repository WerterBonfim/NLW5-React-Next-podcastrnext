export interface IEpisode {
    id: string;
    title: string;
    members: string;
    published_at: Date;
    thumbnail: string;
    description: string;
    file: File;
}

export interface File {
    url: string;
    type: Type;
    duration: number;
}

export enum Type {
    AudioXM4A = "audio/x-m4a",
}

export type Episode = {
    id: string;
    title: string;
    thumbnail: string;
    description: string;
    members: string;
    duration: number;
    durationAsString: string;
    url: string;
    publishedAt: string;
}

export type EpisodePlayer = {
    title: string;
    members: string;
    thumbnail: string;
    duration: number;
    url: string;
}
