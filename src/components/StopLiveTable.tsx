import React from "react";
import LikeButton from "./LikeButton";
import Link from "next/link";
import getLiveTable from "@/actions/getLiveTable";
import StopCard from "@/components/StopCard";
import { getLikeStatus, getTheme } from "@/actions";

type Props = {
  stopId: string;
  stopName: string;
  city: string
};

// @ts-ignore
const StopLiveTable: React.FC<Props> = async ({city, stopId, stopName }) => {
  const LineTable = await getLiveTable(stopId);
  const Theme = await getTheme();
  const isLiked = await getLikeStatus("stop-zs", stopId);

  return (
    <>
      <div className={"flex items-center justify-between"}>
        <Link
          href={`/${city}/stop/${stopId}/${stopName}`}
          className={"p-4 text-2xl text-font dark:dark_font"}
        >
          {stopName}
        </Link>
        <LikeButton
          cookieKey={"stop-zs"}
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
        {LineTable.data.length === 0 && (
          <span className="text-xl font-bold self-center text-font my-3 dark:text-dark_font p-1">
            Brak odjazdów
          </span>
        )}
        <span className="text-gray p-1 self-end">
          Ostatnia aktualizacja: {LineTable.time}
        </span>
      </div>
    </>
  );
};

export default StopLiveTable;
