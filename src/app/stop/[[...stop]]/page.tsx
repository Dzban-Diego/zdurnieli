import React from "react";
import StopLiveTable from "@/Components/StopLiveTable";
import getStopTable from "@/actions/getStopTable";

const Line = ({ params: { stop } }: { params: { stop: [string, string] } }) => {
  return (
    <div className={"flex flex-col items-center text-center"}>
      {/*@ts-ignore*/}
      <StopLiveTable stopId={stop[0]} stopName={decodeURI(stop[1])} />
      <BottomTable query={{ name: stop[1], id: stop[0] }} />
    </div>
  );
};
export default Line;

interface Props {
  query: { id: string; name: string };
}

//@ts-ignore
const BottomTable: React.FC<Props> = async ({ query }) => {
  const Table = await getStopTable(query.id);

  return (
    <>
      <h2 className={"my-3 text-4xl text-textColor dark:text-dark_textColor"}>
        Rozkład jazdy
      </h2>
      {Table ? (
        <div
          className={
            "flex w-full flex-col justify-center overflow-x-scroll text-xl text-orange"
          }
          dangerouslySetInnerHTML={{ __html: Table || "" }}
        />
      ) : null}
    </>
  );
};
