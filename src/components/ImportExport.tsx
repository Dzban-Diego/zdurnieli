"use client";
import { LINES_STORAGE_KEY, STOPS_STORAGE_KEY } from "@/config";
import { useRef } from "react";
import { GoCopy } from "react-icons/go";
import z from "zod";

const dataStructure = z.object({
  lines: z.array(z.object({ name: z.string(), id: z.string() })).optional(),
  stops: z.array(z.object({ name: z.string(), id: z.string() })).optional(),
});

type Props = {
  theme: "light" | "dark";
};

export default function ImportExport({ theme }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleExport() {
    const lines = localStorage.getItem(LINES_STORAGE_KEY);
    const stops = localStorage.getItem(STOPS_STORAGE_KEY);

    const data = {
      lines: lines ? JSON.parse(lines) : [],
      stops: stops ? JSON.parse(stops) : [],
    };

    inputRef.current!.value = JSON.stringify(data);
    handleCopy();
  }

  function handleImport() {
    const data = inputRef.current?.value;
    if (!data) {
      alert("Wprowadź dane");
      return;
    }

    try {
      const parsedData = JSON.parse(data);
      const safeData = dataStructure.safeParse(parsedData);
      if (safeData.success) {
        localStorage.setItem(
          LINES_STORAGE_KEY,
          JSON.stringify(safeData.data.lines || [])
        );
        localStorage.setItem(
          STOPS_STORAGE_KEY,
          JSON.stringify(safeData.data.stops || [])
        );
      }
      alert("Pomyślnie zaimportowano dane");
    } catch (e) {
      alert("Wprowadziłeś niepoprawne dane");
    }
  }

  function handleCopy() {
    if (navigator?.clipboard) {
      navigator?.clipboard?.writeText(inputRef.current?.value || "");
      return;
    }
    inputRef.current?.select();
    inputRef.current?.setSelectionRange(0, 99999);
    document.execCommand("copy");
    inputRef.current?.blur();
  }

  return (
    <div className="flex flex-col">
      <h2>ImportExport</h2>
      <span className="text-font dark:text-dark_font text-justify my-3">
        Możesz zapisać swoje ulubione przystanki i linie by przenieść je do
        innego urządzenia lub do innej przeglądarki. Wklej wcześniej skopiowane
        ulubione przystanki do pola tekstowego i kliknij import. Twoje ulubione
        przystanki i linie zostaną zapisane w pamięci przeglądarki.
      </span>
      <div className="flex">
        <input
          type="text"
          placeholder="Ulubione"
          ref={inputRef}
          className="text-xl rounded shadow p-3 grow dark:bg-black dark:text-dark_font"
        />
        <button className="mx-3" onClick={handleCopy}>
          {theme === "dark" ? (
            <GoCopy size={30} color={"white"} />
          ) : (
            <GoCopy size={30} />
          )}
        </button>
      </div>
      <div className="grid grid-cols-2 gap-3 mt-3">
        <button
          onClick={handleExport}
          className="bg-secondary p-3 shadow rounded dark:bg-black dark:text-dark_font"
        >
          Export
        </button>
        <button
          onClick={handleImport}
          className="bg-secondary p-3 shadow rounded dark:bg-black dark:text-dark_font"
        >
          Import
        </button>
      </div>
    </div>
  );
}
