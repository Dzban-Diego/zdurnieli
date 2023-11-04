import getCity from "@/actions/cities";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const headersList = headers();
  const domain = headersList.get("x-forwarded-host") || "";
  const citySlug = domain.split('.')[0]
  const City = await getCity(citySlug);

	const Lines = await City.getLines();
	return NextResponse.json(Lines);
}
