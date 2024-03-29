"use server";
import { headers } from "next/headers";
import Gdansk from "./gd";
import Szczecin from "./zs";

const CITIES = {
	zs: {
		name: "Szczecin",
		subdomain: "zs",
		func: Szczecin,
	},
	gd: {
		name: "Gdańsk",
		subdomain: "gd",
		func: Gdansk,
	},
};

export type citySlug = keyof typeof CITIES;

const DEFAULT_CITY = "zs";

export default async function getCity() {
	const headersList = headers();
	const domain = headersList.get("x-forwarded-host") || "";
	const citySlug = domain.split(".")[0];

	const city = citySlug
		? citySlug in CITIES
			? CITIES[citySlug as citySlug]
			: CITIES[DEFAULT_CITY]
		: CITIES[DEFAULT_CITY];

	const functions = await city.func();

	return {
		name: city.name,
		subdomain: city.subdomain,
		...functions,
	};
}
