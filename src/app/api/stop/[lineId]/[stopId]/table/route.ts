import getStopTable from "@/actions/getStopTable";
import { NextResponse } from "next/server";

export async function GET(
	_: Request,
	{ params }: { params: { lineId: string; stopId: string } }
) {
	const LineTable = await getStopTable(params.lineId, params.stopId);
	return NextResponse.json(LineTable);
}
