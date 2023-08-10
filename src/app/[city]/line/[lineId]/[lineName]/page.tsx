import React from "react";
import getLineStops from "@/actions/getLineStops";
import LikeButton from "@/components/LikeButton";
import { CustomLink } from "@/components/CustomLink";
import { getLikeStatus, getTheme, getLiked } from "@/actions";

type Params = { params: { city: string; lineId: string; lineName: string } };

// @ts-ignore
const LinePage: React.FC<Params> = async ({
  params: { city, lineId, lineName },
}) => {
  const LineStops = await getLineStops(lineId);
  const Theme = await getTheme();
  const isLiked = await getLikeStatus("line-zs", lineId);
  const LikedStops = await getLiked("stop-zs");

  return (
    <>
      <div className={"flex"}>
        <LikeButton
          cookieKey={"line-zs"}
          name={lineName}
          id={lineId}
          Theme={Theme}
          isLiked={isLiked}
        />
        <h1 className={"p-4 text-4xl dark:text-dark_font text-font"}>
          Linia {lineName}
        </h1>
      </div>

      <div className={"grid grid-cols-2"}>
        {LineStops.map((stops, index) => (
          <Side
            key={index}
            stops={stops}
            likedStopsIds={LikedStops.map((stop) => stop.id)}
            city={city}
          />
        ))}
      </div>
    </>
  );
};

export default LinePage;

type SideProps = {
  stops: { name: string; id: string }[];
  likedStopsIds: string[];
  city: string;
};

function Side({ stops, likedStopsIds, city }: SideProps) {
  return (
    <div className={"flex flex-col"}>
      {stops.map((stop) => (
        <CustomLink
          key={stop.id}
          text={stop.name}
          selected={likedStopsIds.includes(stop.id)}
          href={`/${city}/stop/${stop.id}/${stop.name}`}
        />
      ))}
    </div>
  );
}
