export type Route = {
	href: string;
	name: string;
};

export type Reward = {
	name: string;
	description: string;
	redemptionCode: string;
	points: string;
	quantity: string;
};

export type Event = {
	title: string;
	url: string;
	month: string;
	day: number;
};

export type Status = 'Active' | 'Inactive';
