import React from "react";
import getLineStops from "@/actions/getLineStops";
import LikeButton from "@/components/LikeButton";
import { CustomLink } from "@/components/CustomLink";
import { getLikeStatus, getTheme } from "@/actions";

type Params = { params: { lineId: string; lineName: string } };

// @ts-ignore
const LinePage: React.FC<Params> = async ({ params: { lineId, lineName } }) => {
  const LineStops = await getLineStops(lineId);
  const Theme = await getTheme();
  const isLiked = await getLikeStatus("line", lineId);

  return (
    <>
      <div className={"flex"}>
        <LikeButton
          cookieKey={"line"}
          name={lineName}
          id={lineId}
          Theme={Theme}
          isLiked={isLiked}
        />
        <h1 className={"p-4 text-4xl dark:text-dark_textColor text-textColor"}>
          Linia {lineName}
        </h1>
      </div>

      <div className={"grid grid-cols-2"}>
        {LineStops.map((stops, index) => (
          <Side key={index} stops={stops} />
        ))}
      </div>
    </>
  );
};

export default LinePage;

const Side = ({
  stops,
}: {
  stops: { name: string; id: string; routeLetter: string }[];
}) => {
  const valuesIds = ["1"];

  return (
    <div className={"flex flex-col"}>
      {stops.map((stop) => (
        <CustomLink
          key={stop.id}
          text={stop.name}
          selected={valuesIds.includes(stop.id)}
          href={`/stop/${stop.id}/${stop.routeLetter}/${stop.name}`}
        />
      ))}
    </div>
  );
};
