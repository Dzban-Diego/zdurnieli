import { Multiple } from "@/components/Multiple";
import React from "react";

export default function Loading() {
	return (
		<div className={"grid grid-cols-2"}>
			<div className={"flex flex-col"}>
				<Multiple instances={16}>
					<div
						className={
							"m-1 h-10 animate-pulse rounded bg-loading shadow"
						}
					></div>
				</Multiple>
			</div>
			<div className={"flex flex-col"}>
				<Multiple instances={17}>
					<div
						className={
							"m-1 h-10 animate-pulse rounded bg-loading shadow"
						}
					></div>
				</Multiple>
			</div>
		</div>
	);
}
