import React from "react";
import LikeButton from "./LikeButton";
import { TbArrowsVertical } from "react-icons/tb";
import Link from "next/link";
import { ReactDOMAttributes } from "@use-gesture/react/dist/declarations/src/types";
import getLiveTable from "@/actions/getLiveTable";
import { getLikeStatus, getTheme } from "@/actions";

type Props = {
  stopId: string;
  stopName: string;
  bindMover?: () => ReactDOMAttributes;
};

const StopLiveTable = async ({ stopId, stopName, bindMover }: Props) => {
  const LineTable = await getLiveTable(stopId);
  const Theme = await getTheme();
  const isLiked = await getLikeStatus("stop", stopId);

  return (
    <>
      <div className={"flex items-center justify-between"}>
        {bindMover ? (
          <TbArrowsVertical
            size={30}
            {...bindMover()}
            className={"touch-none text-textColor dark:text-dark_textColor"}
          />
        ) : null}
        <Link
          href={`/stop/${stopId}?name=${stopName}`}
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
      {LineTable ? (
        LineTable.map((line, index) => (
          <div key={index} className={"w-full bg-white dark:bg-black text-orange p-3 text-xl font-bold flex justify-between"}>
            <span>{line.line}</span>
            <span>{line.direction}</span>
            <span>{line.time}</span>
          </div>
        ))
      ) : (
        <div className={"h-48 w-full animate-pulse rounded bg-loading"} />
      )}
    </>
  );
};

export default StopLiveTable;
