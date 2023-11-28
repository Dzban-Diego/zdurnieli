import React, { Suspense } from "react";
import StopLiveTable from "@/components/StopLiveTable";
import { HiOutlineExternalLink } from "react-icons/hi";
import { getStopTable } from "@/actions";

type Props = {
  params: { stopName: string; stopId: string };
};

export default function Stop({ params: { stopId, stopName } }: Props) {
  return (
    <div className={"flex flex-col items-center text-center"}>
      <StopLiveTable stopId={stopId} stopName={decodeURI(stopName)} />
      <Suspense>
        <BottomTable stopId={stopId} />
      </Suspense>
    </div>
  );
}

async function BottomTable({ stopId }: { stopId: string }) {
  const TableData = await getStopTable(stopId);

  return (
    <>
      <h2>
        <a href={TableData.url} className="flex">
          Rozkład jazdy
          <HiOutlineExternalLink className="ml-3"/>
        </a>
      </h2>
      <table className="bg-secondary dark:bg-dark_secondary secondary rounded shadow w-full overflow-hidden">
        <tbody>
          {TableData.data.map((item) => {
            return (
              <tr key={item.hour}>
                <th className="bg-black text-font p-1">{item.hour}</th>
                {item.departures.map((departure) => {
                  return (
                    <td
                      key={departure.minute}
                      className={`route${
                        departure.route
                      } text-font dark:text-dark_font ${
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
}
