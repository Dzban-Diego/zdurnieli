import getLineStops from "@/actions/getLineStops";
import { NextResponse } from "next/server";

export async function GET(
	_: Request,
	{ params }: { params: { lineId: string, lineNumber: string } }
) {
	const LineTable = await getLineStops(`${params.lineId}/${params.lineNumber}`);
	return NextResponse.json(LineTable);
}
