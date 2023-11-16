import getCity from "@/actions/cities";
import { NextResponse } from "next/server";

export async function GET(
	_: Request,
	{ params }: { params: { lineId: string; stopId: string } }
) {
  const City = await getCity();

	const LineTable = await	City.getLiveTable(params.lineId);
	return NextResponse.json(LineTable);
}
