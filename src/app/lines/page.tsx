import React from "react";
import { CustomLink } from "../../components/CustomLink";
import { Multiple } from "../../components/Multiple";
import getLines from "@/actions/getLines";

// @ts-ignore
const Lines: React.FC = async () => {
  const Lines = await getLines();

  return (
    <main className={"p-3"}>
      <div>
        <div>
          {Lines?.map((lineType) => (
            <div key={lineType.header}>
              <h3
                className={
                  "my-3 text-2xl font-bold text-textColor dark:text-dark_textColor"
                }
              >
                {lineType.header}
              </h3>
              <LinesList key={lineType.header} lines={lineType.lines} />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

const LinesList = ({ lines }: { lines: any[] }) => {
  return (
    <div className={"grid grid-cols-4"}>
      {lines.map((line) => (
        <CustomLink
          key={line.id}
          text={line.name}
          selected={false}
          href={`line/${line.id}`}
        />
      ))}
    </div>
  );
};

const Page = () => {
  return <Lines />;
};

export default Page;

const Loader = () => {
  const instances = 64;
  const arr = [];

  for (let i = 0; i < instances; i++) {
    arr.push(
      <div
        className={"m-1 h-10 animate-pulse rounded bg-loading p-2 text-2xl"}
      />
    );
  }
  return (
    <div className={"grid grid-cols-4"}>
      <Multiple instances={65}>
        <div
          className={"m-1 h-10 animate-pulse rounded bg-loading p-2 text-2xl"}
        />
      </Multiple>
    </div>
  );
};
