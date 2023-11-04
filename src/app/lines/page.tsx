import React from "react";
import { getLiked } from "@/actions";
import { CustomLink } from "@/components/CustomLink";
import { LINES_STORAGE_KEY } from "@/config";
import getCity from "@/actions/cities";
import { headers } from "next/headers";

const Lines: React.FC = async () => {
  const headersList = headers();
  const domain = headersList.get("x-forwarded-host") || "";
  const citySlug = domain.split('.')[0]
  const City = await getCity(citySlug);
  const Lines = await City.getLines();
  const LikedLines = await getLiked(LINES_STORAGE_KEY, citySlug);

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

function LinesList({ lines, likedLinesIds }: LinesListProps) {
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
