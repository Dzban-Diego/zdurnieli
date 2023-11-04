export type LineStops = { name: string; id: string }[][];

export type Lines<T extends string> = {
	header: T;
	lines: {
		name: string;
		id: string;
	}[];
}[];

export type LiveTable = {
	time: string;
	data: {
		line: string;
		direction: string;
		time: string;
	}[];
};

export type StopTable = {
	hour: string;
	departures: {
		minute: number;
		route: string;
		url: string;
		current: boolean;
	}[];
}[];
