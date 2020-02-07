import {MyActivity} from "../Interfaces/Models/IMyActivity";

class MusicStatsService {
	//#region Properties
	sortedData: Array<{title:string, artist:string}> = new Array();

	uniqueTitles: Array<{}> = [];
	uniqueArtists: Array<{}> = [];
	//
	totalTitles:string = '';
	totalArtists:string = '';

	titleCount: object = {};
	artistCount: object = {};

	artistsSorted: Array<[string,number]> = [];
	titlesSorted: Array<[string,string,number]> = [];

	constructor(jsonFile:Array<{title:string, description:string}>, year:number) {
		this.sortRawData(jsonFile,year);
		this.initSort();
	}
	initSort(): void {
		this.sortInfo();
		this.countArtists();
		this.sortArtists();
		this.countTitles();
		this.sortTitles();
	}

	//#endregion

	//#region Methods

	static createObj(data){
		const file = JSON.parse(data.file)
		const year = data.year;

		const statsObj = new MusicStatsService(file, year);

		const activity: MyActivity = {
			totalTitles : statsObj.uniqueTitles.length.toString(),
			totalArtists : statsObj.uniqueArtists.length.toString(),

			titleCount : statsObj.titleCount,
			artistCount : statsObj.artistCount,

			artistsSorted : statsObj.artistsSorted,
			titlesSorted : statsObj.titlesSorted
		};
		return activity;
	}

	sortRawData(jsonFile:Array<{title:string, description:string}>,year: number): void {
		const yearVar: string = year.toString();

		jsonFile.forEach(element => {
			if (element.hasOwnProperty('title')) {
				if (JSON.stringify(element).includes(yearVar) 
				&& JSON.stringify(element).includes('Listened to')) {
					this.sortedData.push(
						{ title: JSON.stringify(element.title).slice(13, -1)
							, artist: element.description });
				}
			}
		});
	}

	sortInfo(): void {
		this.sortedData.forEach(item => {
			if (!this.uniqueArtists.includes(item.artist)) {
				this.uniqueArtists.push(item.artist);
			}
			if (!this.uniqueTitles.includes(item.title)) {
				this.uniqueTitles.push({ title: item.title, artist: item.artist });
			}else{
				console.log(item.title)
			}
		});
	}

	/// Counts the number of times a song shows up in the list
	// If it isnt already in the list it will add the item.
	countTitles(): void {
		this.sortedData.forEach(item => {
			if (!this.titleCount.hasOwnProperty(`${item.title} `)) {
				this.titleCount[`${item.title} `] = [`${item.artist} `, 1];
			} else {
				this.titleCount[`${item.title} `][1] += 1;
			}
		});
	}

	/// Counts the number of times a artist shows up in the list
	// If it isnt already in the list it will add the item.
	countArtists(): void {
		this.sortedData.forEach(item => {
			this.artistCount[`${item.artist} `] = !this.artistCount.hasOwnProperty(`${item.artist} `)
				? 1
				: this.artistCount[`${item.artist} `] + 1;
		});
	}

	sortArtists(): void {
		let sortable = [];
		for (let item in this.artistCount) {
			sortable.push([item, this.artistCount[item]]);
		}

		sortable.sort((a, b) => {
			return b[1] - a[1];
		});
		sortable.length = 20;
		this.artistsSorted = sortable;
	}

	sortTitles(): void {
		let sortable = [];
		for (let item in this.titleCount) {
			sortable.push([item, this.titleCount[item][0], this.titleCount[item][1]]);
		}

		sortable.sort((a, b) => {
			return b[2] - a[2];
		});
		sortable.length = 25;
		this.titlesSorted = sortable;
	}
	//#endregion
}

export {MusicStatsService as default}
