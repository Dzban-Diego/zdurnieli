"use client";
import { useEffect } from "react";
import { setCookies } from "@/actions";
import { LINES_STORAGE_KEY, STOPS_STORAGE_KEY } from "@/config";

type Props = {
  line: boolean;
  stop: boolean;
  theme: boolean;
};

function CheckLocalStorage(props: Props) {
  useEffect(() => {
    const theme = unpacData<string>(localStorage.getItem("theme"));
    const old_stop = unpacData<{ name: string; id: string }[]>(
      localStorage.getItem("stop")
    );
    const old_line = unpacData<{ name: string; id: string }[]>(
      localStorage.getItem("line")
    );

    const stop = unpacData<{ name: string; id: string }[]>(
      localStorage.getItem(STOPS_STORAGE_KEY)
    );
    const line = unpacData<{ name: string; id: string }[]>(
      localStorage.getItem(LINES_STORAGE_KEY)
    );

    const stopfirst = stop?.[0]?.id;
    if (stopfirst) {
      const isStopOld = stopfirst.split("").includes("/");

      if (isStopOld) {
        localStorage.removeItem("stop");
        setCookies(STOPS_STORAGE_KEY, JSON.stringify([]));

        alert(
          "Przepraszamy twoje ulubione przystanki musiały zostać zresetowane :("
        );

        return;
      }
    }

    if (props.theme && theme) {
      setCookies("theme", JSON.stringify(theme));
    }

    if (props.line && old_line) {
      setCookies(LINES_STORAGE_KEY, JSON.stringify(old_line));
      localStorage.removeItem("line");
      localStorage.setItem(LINES_STORAGE_KEY, JSON.stringify(old_line));
    }

    if (props.stop && old_stop) {
      setCookies(STOPS_STORAGE_KEY, JSON.stringify(old_stop));
      localStorage.removeItem("stop");
      localStorage.setItem(STOPS_STORAGE_KEY, JSON.stringify(old_stop));
    }

    if (props.line && line) {
      setCookies(LINES_STORAGE_KEY, JSON.stringify(line));
    }

    if (props.stop && stop) {
      setCookies(STOPS_STORAGE_KEY, JSON.stringify(stop));
    }
  }, [props.line, props.stop, props.theme]);

  return null;
}

export default CheckLocalStorage;

function unpacData<T>(json: string | null) {
  try {
    if (!json) return null;
    return JSON.parse(json) as T;
  } catch {
    return null;
  }
}
