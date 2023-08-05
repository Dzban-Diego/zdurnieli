import React from "react";
import { CustomLink } from "../../components/CustomLink";
import getLines from "@/actions/getLines";
import { getLiked } from "@/actions";

// @ts-ignore
const Lines: React.FC = async () => {
  const Lines = await getLines();
  const LikedLines = await getLiked("line");

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
              <LinesList
                key={lineType.header}
                lines={lineType.lines}
                likedLinesIds={LikedLines.map((line) => line.id)}
              />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

type LinesListProps = {
  lines: { name: string; id: string }[];
  likedLinesIds: string[];
};

function LinesList({ lines, likedLinesIds }: LinesListProps) {
  return (
    <div className={"grid grid-cols-4"}>
      {lines.map((line) => (
        <CustomLink
          key={line.id}
          text={line.name}
          selected={likedLinesIds.includes(line.id)}
          href={`line/${line.id}/${line.name}`}
        />
      ))}
    </div>
  );
}

export default Lines;
