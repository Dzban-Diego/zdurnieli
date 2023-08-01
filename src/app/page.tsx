import { getLiked, getTheme } from "@/actions";
import { CustomLink } from "@/components/CustomLink";
import StopLiveTable from "@/components/StopLiveTable";
import CheckLocalStorage from "@/components/CheckLocalStorage";
import React, { Suspense } from "react";
import Loading from "./loading";

export const revalidate = 12;

async function Home() {
  const stops = await getLiked("stop");
  const lines = await getLiked("line");
  const theme = await getTheme();

  // push
  return (
    <div className="flex flex-col p-2">
      <CheckLocalStorage theme={!!theme} line={!!lines} stop={!!stops} />
      <h2
        className={
          "flex justify-center text-3xl text-textColor dark:text-dark_textColor"
        }
      >
        Ulubione przystanki
      </h2>
      {stops.map((stop) => (
        <StopLiveTable
          key={stop.id}
          stopId={stop.id || ""}
          stopName={stop.name || ""}
        />
      ))}
      <h2
        className={
          "my-3 flex justify-center text-3xl text-textColor dark:text-dark_textColor"
        }
      >
        Ulubione Linie
      </h2>
      <div className={"grid grid-cols-4"}>
        {lines.map((line) => (
          <CustomLink
            key={line.id}
            href={`line/${line.id}`}
            text={line.name}
          />
        ))}
      </div>
      {stops?.length === 0 && lines?.length === 0 ? (
        <span className={"mb-4 text-xl text-textColor"}>
          Twoje ulubione przystanki i linie będą się tutaj wyświetlać, dodaj je!
        </span>
      ) : null}
      <CustomLink href={"/lines"} text={"Wszystkie linie"} />
    </div>
  );
}

const Page = () => {
  return (
    <Suspense fallback={<Loading />}>
      {/* @ts-ignore */}
      <Home />
    </Suspense>
  );
};

export default Page;
