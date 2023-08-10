import React from "react";
import getLines from "@/actions/getLines";
import { getLiked } from "@/actions";
import { CustomLink } from "@/components/CustomLink";

type Props = { params: { city: string } };

// @ts-ignore
const Lines: React.FC = async ({ params: { city } }: Props) => {
  const Lines = await getLines();
  const LikedLines = await getLiked("line-zs");

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
                city={city}
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
  city: string;
};

function LinesList({ lines, likedLinesIds, city }: LinesListProps) {
  return (
    <div className={"grid grid-cols-4"}>
      {lines.map((line) => (
        <CustomLink
          key={line.id}
          text={line.name}
          selected={likedLinesIds.includes(line.id)}
          href={`/${city}/line/${line.id}/${line.name}`}
        />
      ))}
    </div>
  );
}

export default Lines;
