import React, { Suspense } from "react";
import StopLiveTable from "@/components/StopLiveTable";
import getStopTable from "@/actions/getStopTable";

const Line = ({
  params: { stop },
}: {
  params: { stop: [string, string, string, string] };
}) => {
  const lineId = stop[0];
  const stopId = `${stop[0]}/${stop[1]}`;
  const stopName = stop[2];

  return (
    <div className={"flex flex-col items-center text-center"}>
      <StopLiveTable stopId={stopId} stopName={decodeURI(stopName)} />
      {/* <BottomTable query={{ name: stopName, id: stopId, lineId}} />*/}
    </div>
  );
};

const Page = ({
  params,
}: {
  params: { stop: [string, string, string, string] };
}) => {
  return (
    <Suspense>
      <Line params={params} />
    </Suspense>
  );
};

export default Page;

interface Props {
  query: { id: string; name: string; lineId: string };
}

//@ts-ignore
const BottomTable: React.FC<Props> = async ({ query }) => {
  const Table = await getStopTable(query.lineId, query.id);

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
