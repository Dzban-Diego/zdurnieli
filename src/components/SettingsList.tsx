"use client";
import { setCookies } from "@/actions";
import { GoArrowDown, GoArrowUp } from "react-icons/go";

type Props = {
  list: {
    name: string;
    id: string;
  }[];
  cookieKey: "stop" | "line";
};

function SettingsList({ list, cookieKey }: Props) {
  function moveUp(index: number) {
    const newList = [...list];
    const item = newList[index];
    const prevItem = newList[index - 1];
    if (!item || !prevItem) {
      return;
    }
    newList[index] = prevItem;
    newList[index - 1] = item;
    setCookies(cookieKey, JSON.stringify(newList));
    localStorage.setItem(cookieKey, JSON.stringify(newList));
  }

  function moveDown(index: number) {
    const newList = [...list];
    const item = newList[index];
    const prevItem = newList[index + 1];
    if (!item || !prevItem) {
      return;
    }
    newList[index] = prevItem;
    newList[index + 1] = item;
    console.log(newList);
    setCookies(cookieKey, JSON.stringify(newList));
    localStorage.setItem(cookieKey, JSON.stringify(newList));
  }

  return (
    <>
      {list.map((stop, index) => (
        <Item
          key={stop.id}
          index={index}
          name={stop.name}
          moveUp={moveUp}
          moveDown={moveDown}
        />
      ))}
    </>
  );
}

export default SettingsList;

type ItemProps = {
  name: string;
  index: number;
  moveUp: (id: number) => void;
  moveDown: (id: number) => void;
};

function Item({ name, index, moveDown, moveUp }: ItemProps) {
  return (
    <div className="text-xl p-4 flex flex-row w-full bg-white shadow justify-between rounded mb-3">
      {name}
      <div className="flex gap-3">
        <button onClick={() => moveUp(index)}>
          <GoArrowUp size={30} />
        </button>
        <button onClick={() => moveDown(index)}>
          <GoArrowDown size={30} />
        </button>
      </div>
    </div>
  );
}
