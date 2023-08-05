"use client";
import { setCookies } from "@/actions";
import { GoArrowDown, GoArrowUp } from "react-icons/go";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useState } from "react";

type Props = {
  list: {
    name: string;
    id: string;
  }[];
  cookieKey: "stop" | "line";
};

function SettingsList({ list: cookieList, cookieKey }: Props) {
  const [list, setList] = useState(cookieList);
  const [listRef] = useAutoAnimate({
    duration: 200,
  });

  function replaceItems(index: number, secondIndex: number) {
    const newList = [...list];
    const item = newList[index];
    const prevItem = newList[secondIndex];
    if (!item || !prevItem) {
      return;
    }
    newList[index] = prevItem;
    newList[secondIndex] = item;
    setCookies(cookieKey, JSON.stringify(newList));
    setList(newList);
    localStorage.setItem(cookieKey, JSON.stringify(newList));
  }

  return (
    <div ref={listRef}>
      {list.map((stop, index) => (
        <Item
          key={stop.id}
          index={index}
          name={stop.name}
          moveUp={() => replaceItems(index, index - 1)}
          moveDown={() => replaceItems(index, index + 1)}
          last={index === list.length - 1}
          first={index === 0}
        />
      ))}
    </div>
  );
}

export default SettingsList;

type ItemProps = {
  name: string;
  index: number;
  moveUp: (id: number) => void;
  moveDown: (id: number) => void;
  last?: boolean;
  first?: boolean;
};

function Item({ name, index, moveDown, moveUp, first, last }: ItemProps) {
  return (
    <div className="text-xl p-4 flex flex-row w-full bg-white dark:bg-black dark:text-dark_textColor shadow justify-between rounded mb-3">
      {name}
      <div className="flex gap-3">
        <button onClick={() => moveUp(index)} disabled={first}>
          <GoArrowUp size={30} color={first ? "grey" : undefined} />
        </button>
        <button onClick={() => moveDown(index)} disabled={last}>
          <GoArrowDown size={30} color={last ? "grey" : undefined} />
        </button>
      </div>
    </div>
  );
}
