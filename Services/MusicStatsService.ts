import {MyActivity} from "../Interfaces/IMyActivity";

class MusicStatsService {
	//#region Properties
	rawJson = null;
	stringJson: string = null;

	uniqueTitles: any[] = [];
	uniqueArtists: any[] = [];

	titleCount: object = {};
	artistCount: object = {};

	artistsSorted: any[] = [];
	titlesSorted: any[] = [];

	data: any[] = new Array();

	// re-enable getters when i figure out the compiler issues.
	// public get UniqueTitles() : Array<any> {
	//     return this.uniqueTitles;
	// }

	// public get UniqueArtists() : Array<any> {
	//     return this.uniqueArtists;
	// }

	// public get TitleCount() : Object {
	//     return this.TitleCount;
	// }

	// public get ArtistCount() : Object {
	//     return this.artistCount;
	// }

	//#endregion

	//#region Constructors
	constructor(path: string, year: number) {
		this.rawJson = this.getJSON(path);
		this.stringJson = JSON.stringify(this.rawJson);
		this.parseJSON(year);
		this.init();


	}
	init(): void {
		this.sortInfo();
		this.countArtist();
		this.getArtistsSorted();
		this.countTitles();
		this.getTitlesSorted();
	}

	static createObj(path:string, year:number){
		let statsObj = new MusicStatsService(path, year);

		const activity:MyActivity = {
			uniqueTitles : statsObj.uniqueTitles,
			uniqueArtists : statsObj.uniqueArtists,

			titleCount : statsObj.titleCount,
			artistCount : statsObj.artistCount,

			artistsSorted : statsObj.artistsSorted,
			titlesSorted : statsObj.titlesSorted
		};
		return activity;
	}
	//#endregion

	//#region Methods
	getJSON(path: string): Array<object> {
		let result: Array<object> = null;
		try {
			result = require(path);
		} catch (e) {
			console.log(e);
		}
		return result;
	}

	parseJSON(year: number): void {
		const yearVar: string = year.toString();
		this.rawJson.forEach(element => {
			if (element.hasOwnProperty('title')) {
				if (JSON.stringify(element).includes(yearVar) && JSON.stringify(element).includes('Listened to')) {
					this.data.push({ title: JSON.stringify(element.title).slice(13, -1), artist: element.description });
				}
			}
		});
	}

	sortInfo(): void {
		this.data.forEach(item => {
			if (!this.uniqueArtists.includes(item.artist)) {
				this.uniqueArtists.push(item.artist);
			}
			if (!this.uniqueTitles.includes(item.title)) {
				this.uniqueTitles.push({ title: item.title, artist: item.artist });
			}
		});
	}

	countTitles(): void {
		this.data.forEach(item => {
			if (!this.titleCount.hasOwnProperty(`${item.title} `)) {
				this.titleCount[`${item.title} `] = [`${item.artist} `, 1];
			} else {
				this.titleCount[`${item.title} `][1] += 1;
			}
		});
	}

	// @deprecated as there is a better way to do this
	// countTitles(){
	//     this.info.forEach(item => {
	//         // if the title count doesnt have the artist
	//         if(!this.titleCount.hasOwnProperty(item.artist))
	//         {
	//             // add the artist and first title
	//             this.titleCount[item.artist] =
	//             {
	//                 titles: {}
	//             };
	//             this.titleCount[item.artist].titles[item.title] = 1;
	//         }
	//         // else if title count -> artist doesnt contain the title
	//         else if(!this.titleCount[item.artist]["titles"].hasOwnProperty(item.title)){
	//             this.titleCount[item.artist].titles[item.title] = 1;
	//         }else if(this.titleCount[item.artist]["titles"].hasOwnProperty(item.title)){
	//             this.titleCount[item.artist].titles[item.title] += 1;
	//         }
	//     })
	// }

	countArtist(): void {
		this.data.forEach(item => {
			this.artistCount[`${item.artist} `] = !this.artistCount.hasOwnProperty(`${item.artist} `)
				? 1
				: this.artistCount[`${item.artist} `] + 1;
		});
	}

	getArtistsSorted(): void {
		var sortable = [];
		for (var item in this.artistCount) {
			sortable.push([item, this.artistCount[item]]);
		}

		sortable.sort(function(a, b) {
			return b[1] - a[1];
		});
		sortable.length = 20;
		this.artistsSorted = sortable;
	}

	getTitlesSorted(): void {
		var sortable = [];
		for (var item in this.titleCount) {
			sortable.push([item, this.titleCount[item][0], this.titleCount[item][1]]);
		}

		sortable.sort(function(a, b) {
			return b[2] - a[2];
		});
		sortable.length = 25;
		this.titlesSorted = sortable;
	}
	//#endregion
}

export {MusicStatsService as default}
