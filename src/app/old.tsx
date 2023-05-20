import { type NextPage } from "next";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Page } from "../Components/Page";
import StopLiveTable from "../Components/StopLiveTable";
import useLocalStorage from "../hooks/useLocalStorage";
import { CustomLink } from "../Components/CustomLink";
import { useSprings, animated, config } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import clamp from "lodash.clamp";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore-next-line no-restricted-imports
import swap from "lodash-move";

const Home: NextPage = () => {
  const myStops = useLocalStorage("myStops").values;
  const myLines = useLocalStorage("myLines").values;

  const [loaded, setLoaded] = useState(false);
  const order = useMemo(() => {
    if (!loaded) return [];
    const valueString = localStorage.getItem("myOrder");
    if (valueString) {
      const value = JSON.parse(valueString) as unknown;
      if (value && Array.isArray(value)) {
        return value as number[];
      }
    }
  }, [loaded]);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <Page>
      <div className={"flex flex-col p-2"}>
        {myStops?.length ? (
          <>
            <h2
              className={
                "flex justify-center text-3xl text-textColor dark:text-dark_textColor"
              }
            >
              Ulubione przystanki
            </h2>
            <DraggableList items={myStops} initialOrder={order} />
          </>
        ) : null}
        {myLines?.length ? (
          <>
            <h2
              className={
                "my-3 flex justify-center text-3xl text-textColor dark:text-dark_textColor"
              }
            >
              Ulubione Linie
            </h2>
            <div className={"grid grid-cols-4"}>
              {myLines.map((line) => (
                <CustomLink
                  key={line.id}
                  href={`line/${line.id}?name=${line.name}`}
                  text={line.name}
                />
              ))}
            </div>
          </>
        ) : null}
        {myStops?.length === 0 && myLines?.length === 0 ? (
          <span className={"mb-4 text-xl text-textColor"}>
            Twoje ulubione przystanki i linie będą się tutaj wyświetlać, dodaj
            je!
          </span>
        ) : null}
        <CustomLink href={"/lines"} text={"Wszystkie linie"} />
      </div>
    </Page>
  );
};

export default Home;
const height = 300;

const fn =
  (order: number[], active = false, originalIndex = 0, curIndex = 0, y = 0) =>
  (index: number) =>
    active && index === originalIndex
      ? {
          y: curIndex * height + y,
          zIndex: 1,
          shadow: 15,
          immediate: (key: string) => key === "zIndex",
          config: (key: string) =>
            key === "y" ? config.stiff : config.default,
        }
      : {
          y: order.indexOf(index) * height,
          scale: 1,
          zIndex: 0,
          shadow: 1,
          immediate: false,
        };

function DraggableList({
  items,
  initialOrder,
}: {
  items: { id: string; name: string }[];
  initialOrder?: number[];
}) {
  let orderArray: number[];

  if (initialOrder) {
    orderArray = initialOrder;
    if (initialOrder.length < items.length) {
      for (let i = initialOrder.length; i < items.length; i++) {
        orderArray.push(i);
      }
    }
  } else {
    orderArray = items.map((_, index) => index);
  }
  const order = useRef(orderArray); // Store indicies as a local ref, this represents the item order
  const [springs, api] = useSprings<{ zIndex: number; y: number }>(
    items.length,
    fn(order.current)
  ); // Create springs, each corresponds to an item, controlling its transform, scale, etc.

  const bind = useDrag(({ args: [originalIndex], active, movement: [, y] }) => {
    const originalIndexNumber = originalIndex as number;
    const curIndex = order.current.indexOf(originalIndexNumber);
    const curRow = clamp(
      Math.round((curIndex * height + y) / height),
      0,
      items.length - 1
    );
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const newOrder = swap(order.current, curIndex, curRow) as number[];
    api.start(fn(newOrder, active, originalIndexNumber, curIndex, y)); // Feed springs new style data, they'll animate the view without causing a single render
    if (!active) {
      order.current = newOrder;
      localStorage.setItem("myOrder", JSON.stringify(newOrder));
    }
  });

  return (
    <div className={"content flex"} style={{ height: items.length * height }}>
      {springs.map(({ zIndex, y }, i) => (
        <animated.div
          key={i}
          style={{
            zIndex,
            y,
            height: height,
          }}
          className={"overflow-hidden"}
        >
          <StopLiveTable
            stopId={items[i]?.id || ""}
            stopName={items[i]?.name || ""}
            bindMover={() => bind(i)}
          />
        </animated.div>
      ))}
    </div>
  );
}
