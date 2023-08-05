import getLineStops from "@/actions/getLineStops";
import { NextResponse } from "next/server";

export async function GET(
	_: Request,
	{ params }: { params: { lineId: string } }
) {
	const LineTable = await getLineStops(params.lineId);
	return NextResponse.json(LineTable);
}
