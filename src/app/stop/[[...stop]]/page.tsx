import React, { Suspense } from "react";
import StopLiveTable from "@/components/StopLiveTable";
import getStopTable from "@/actions/getStopTable";

export const revalidate = 12;

const Line = ({
  params: { stop },
}: {
  params: { stop: [string, string, string, string] };
}) => {
  const lineId = stop[0];
  const stopId = stop[1];
  const stopName = stop[2];

  return (
    <div className={"flex flex-col items-center text-center"}>
      <StopLiveTable
        stopId={`${lineId}/${stopId}`}
        stopName={decodeURI(stopName)}
      />
      <BottomTable stopId={stopId} lineId={lineId} />
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
  stopId: string;
  lineId: string;
}

//@ts-ignore
const BottomTable: React.FC<Props> = async ({ lineId, stopId }) => {
  const TableData = await getStopTable(lineId, stopId);

  return (
    <>
      <h2 className={"my-3 text-4xl text-textColor dark:text-dark_textColor"}>
        Rozkład jazdy
      </h2>
      <table className="bg-white  dark:bg-[#191a1e] secondary rounded shadow w-full overflow-hidden">
        <tbody>
          {TableData.map((item) => {
            return (
              <tr key={item.hour}>
                <th className="bg-black text-white p-1">{item.hour}</th>
                {item.departures.map((departure) => {
                  return (
                    <td
                      key={departure.minute}
                      className={`route${
                        departure.route
                      } text-black dark:text-white ${
                        departure.current
                          ? "border-2 border-green-500 rounded"
                          : ""
                      }`}
                    >
                      <a href={departure.url} className="">
                        <span>{departure.minute}</span>
                        <span className="align-top text-xs">
                          {departure.route}
                        </span>
                      </a>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
