import getLiveTable from "@/actions/getLiveTable";
import { NextResponse } from "next/server";

export async function GET(
	_: Request,
	{ params }: { params: { lineId: string; stopId: string } }
) {
	const LineTable = await getLiveTable(params.lineId);
	return NextResponse.json(LineTable);
}
