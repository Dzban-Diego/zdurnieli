import React from "react";
import getLineStops from "@/actions/getLineStops";
import LikeButton from "@/components/LikeButton";
import { CustomLink } from "@/components/CustomLink";
import { getLikeStatus, getTheme } from "@/actions";

type Params = { params: { line: [string, string] } };

// @ts-ignore
const Line: React.FC<Params> = async ({ params }) => {
  const lineId = `${params.line[0]}/${params.line[1]}`;
  const LineStops = await getLineStops(lineId);
  const Theme = await getTheme();
  const isLiked = await getLikeStatus("line", lineId);

  return (
    <>
      <div className={"flex"}>
        <LikeButton
          cookieKey={"line"}
          name={params.line[1]}
          id={lineId}
          Theme={Theme}
          isLiked={isLiked}
        />
        <h1 className={"p-4 text-4xl dark:text-dark_textColor text-textColor"}>
          Linia {params.line[1]}
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

const LinePage = ({ params }: { params: { line: [string, string] } }) => {
  return <Line params={params} />;
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
