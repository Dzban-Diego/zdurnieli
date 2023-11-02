import React from "react";
import getLines from "@/actions/getLines";
import { getLiked } from "@/actions";
import { CustomLink } from "@/components/CustomLink";
import { LINES_STORAGE_KEY } from "@/config";

const Lines: React.FC = async () => {
  const Lines = await getLines();
  const LikedLines = await getLiked(LINES_STORAGE_KEY);

  return (
    <main className={"p-3"}>
      <div>
        <div>
          {Lines?.map((lineType) => (
            <div key={lineType.header}>
              <h3
                className={
                  "my-3 text-2xl font-bold text-fonc dark:text-dark_font"
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

function LinesList({ lines, likedLinesIds}: LinesListProps) {
  return (
    <div className={"grid grid-cols-4"}>
      {lines.map((line) => (
        <CustomLink
          key={line.id}
          text={line.name}
          selected={likedLinesIds.includes(line.id)}
          href={`/line/${line.id}/${line.name}`}
        />
      ))}
    </div>
  );
}

export default Lines;
