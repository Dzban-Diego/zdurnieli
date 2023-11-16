import getCity from "@/actions/cities";
import { NextResponse } from "next/server";

export async function GET() {
  const City = await getCity();

	const Lines = await City.getLines();
	return NextResponse.json(Lines);
}
