"use client";
import { useEffect } from "react";
import { setCookies } from "@/actions";

type Props = {
  line: boolean;
  stop: boolean;
  theme: boolean;
};

function CheckLocalStorage(props: Props) {
  useEffect(() => {
    const theme = unpacData<string>(localStorage.getItem("theme"));
    const stop = unpacData<{ name: string; id: string }[]>(
      localStorage.getItem("stop")
    );
    const line = unpacData<{ name: string; id: string }[]>(
      localStorage.getItem("line")
    );

    const stopfirst = stop?.[0]?.id
    if (stopfirst) {
      const isStopOld = stopfirst.split('').includes('/')

      if (isStopOld) {
        localStorage.removeItem("stop");
        setCookies("stop", JSON.stringify([]));

        alert('Przepraszamy twoje ulubione przystanki musiały zostać zresetowane :(')

        return
      }
    }

    if (props.theme && theme) {
      setCookies("theme", JSON.stringify(theme));
    }

    if (props.line && line) {
      setCookies("line", JSON.stringify(line));
    }

    if (props.stop && stop) {
      setCookies("stop", JSON.stringify(stop));
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
