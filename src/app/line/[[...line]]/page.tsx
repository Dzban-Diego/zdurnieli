import React from "react";
import getLineStops from "@/actions/getLineStops";
import LikeButton from "@/Components/LikeButton";
import { CustomLink } from "@/Components/CustomLink";
import { Multiple } from "@/Components/Multiple";
import { getLikeStatus, getTheme } from "@/actions";

// 0 - id 1 - name
const Line = async ({ params }: { params: { line: [string, string] } }) => {
  const LineStops = await getLineStops(params.line[0]);
  const Theme = await getTheme();
  const isLiked = await getLikeStatus("line", params.line[0]);

  return (
    <>
      <div className={"flex"}>
        <LikeButton
          cookieKey={"line"}
          name={params.line[1]}
          id={params.line[0]}
          Theme={Theme}
          isLiked={isLiked}
        />
        <h1 className={"p-4 text-4xl dark:text-dark_textColor text-textColor"}>
          Linia {params.line[1]}
        </h1>
      </div>

      {LineStops ? (
        <div className={"grid grid-cols-2"}>
          {LineStops.map((stops, index) => (
            <Side key={index} stops={stops} />
          ))}
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};
export default Line;

const Side = ({ stops }: { stops: { name: string; id: string }[] }) => {
  const valuesIds = ["1"];

  return (
    <div className={"flex flex-col"}>
      {stops.map((stop) => (
        <CustomLink
          key={stop.id}
          text={stop.name}
          selected={valuesIds.includes(stop.id)}
          href={`/stop/${stop.id}/${stop.name}`}
        />
      ))}
    </div>
  );
};

const Loader = () => {
  return (
    <div className={"grid grid-cols-2"}>
      <div className={"flex flex-col"}>
        <Multiple instances={16}>
          <div
            className={"m-1 h-10 animate-pulse rounded bg-loading shadow"}
          ></div>
        </Multiple>
      </div>
      <div className={"flex flex-col"}>
        <Multiple instances={17}>
          <div
            className={"m-1 h-10 animate-pulse rounded bg-loading shadow"}
          ></div>
        </Multiple>
      </div>
    </div>
  );
};
