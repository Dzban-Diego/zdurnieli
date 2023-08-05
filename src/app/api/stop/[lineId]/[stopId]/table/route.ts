import getStopTable from "@/actions/getStopTable";
import { NextResponse } from "next/server";

export async function GET(
	_: Request,
	{ params }: { params: { lineId: string } }
) {
	const LineTable = await getStopTable(params.lineId);
	return NextResponse.json(LineTable);
}
