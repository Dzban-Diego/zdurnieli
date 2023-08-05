import React from "react";
import LikeButton from "./LikeButton";
import Link from "next/link";
import getLiveTable from "@/actions/getLiveTable";
import StopCard from "@/components/StopCard";
import { getLikeStatus, getTheme } from "@/actions";

type Props = {
  stopId: string;
  stopName: string;
};

// @ts-ignore
const StopLiveTable: React.FC<Props> = async ({
  stopId,
  stopName,
}) => {
  const LineTable = await getLiveTable(stopId);
  const Theme = await getTheme();
  const isLiked = await getLikeStatus("stop", stopId);

  return (
    <>
      <div className={"flex items-center justify-between"}>
        <Link
          href={`/stop/${stopId}/${stopName}`}
          className={"p-4 text-2xl text-textColor dark:text-dark_textColor"}
        >
          {stopName}
        </Link>
        <LikeButton
          cookieKey={"stop"}
          name={stopName}
          id={stopId}
          isLiked={isLiked}
          Theme={Theme}
        />
      </div>
      <div className="bg-white dark:bg-black w-full rounded shadow flex flex-col">
        {LineTable.data.map((line, index) => (
          <StopCard key={index} {...line} />
        ))}
        <span className="text-gray p-1 text-right self-end">
          Ostatnia aktualizacja: {LineTable.time}
        </span>
      </div>
    </>
  );
};

export default StopLiveTable;
