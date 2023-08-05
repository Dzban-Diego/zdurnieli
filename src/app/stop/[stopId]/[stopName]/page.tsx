import React from "react";
import StopLiveTable from "@/components/StopLiveTable";
import getStopTable from "@/actions/getStopTable";

export const revalidate = 12;

type Props = {
  params: { stopName: string; stopId: string };
};

export default function Stop({ params: { stopId, stopName } }: Props) {
  return (
    <div className={"flex flex-col items-center text-center"}>
      <StopLiveTable stopId={stopId} stopName={decodeURI(stopName)} />
      {/* @ts-ignore */}
      <BottomTable stopId={stopId} />
    </div>
  );
}

async function BottomTable({ stopId }: { stopId: string }) {
  const TableData = await getStopTable(stopId);

  return (
    <>
      <h2 className={"my-3 text-4xl text-textColor dark:text-dark_textColor"}>
        <a
          href={`https://www.zditm.szczecin.pl/pl/pasazer/rozklady-jazdy/tabliczka/${stopId.replaceAll(
            "-",
            "/"
          )}`}
        >
          Rozkład jazdy
        </a>
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
}
