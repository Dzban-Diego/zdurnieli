import getLines from "@/actions/getLines";
import { NextResponse } from "next/server";

export async function GET() {
	const Lines = await getLines();
	return NextResponse.json(Lines);
}
