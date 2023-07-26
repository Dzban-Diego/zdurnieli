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

// @ts-ignore
const StopLiveTable: React.FC<Props> = async ({
  stopId,
  stopName,
  bindMover,
}) => {
  const LineTable = await getLiveTable(stopId.split("/")[1]);
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
      <div className="bg-white dark:bg-black w-full rounded shadow">
        {LineTable.map((line, index) => (
          <div
            key={index}
            className={"text-orange p-3 text-xl font-bold flex justify-between"}
          >
            <span className="w-1/12">{line.line}</span>
            <span className="w-8/12">{line.direction}</span>
            <span className="w-1/12">{line.time}</span>
          </div>
        ))}
      </div>
    </>
  );
};

export default StopLiveTable;
