export interface SongInput {
	songs: [
		{
			title: string;
			artist: string;
			numberOfListens: number;
		}
	];
}

export interface ArtistInput {
	data: [string, number][] | undefined;
}
export interface SongData {
	artistCount: { [title: string]: number };
	artistsSorted: Array<[string, number]>;
	titleCount: { [title: string]: [string, number] };
	titlesSorted: Array<[string, string, number]>;
	totalArtists: number;
	totalTitles: number;
}
export interface Counts {
	songCount: number | undefined;
	artistCount: number | undefined;
}
export interface Artist {
	name: string;
	numberOfListens: number;
}
export interface Song {
	title: string;
	artist: string;
	numberOfListens: number;
}
export interface UserActivities {
	readonly artistCount: number;
	readonly songCount: number;
	readonly songs: [
		{
			title: string;
			artist: string;
			numberOfListens: number;
		}
	];
	readonly artists: [
		{
			artist: string;
			numberOfListens: number;
		}
	];
}
