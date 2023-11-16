"use client";
import { useEffect } from "react";
import { removeCookie, setCookies } from "@/actions";
import { Keys, LINES_STORAGE_KEY, STOPS_STORAGE_KEY } from "@/config";
import { unpacData } from "@/helpers";

export function calculateKey(key: string, city?: string) {
  if (city) {
    return `${key}-${city.length > 2 ? "zs" : city}`;
  }
  return key
}

type Props = {
  line: boolean;
  stop: boolean;
  theme: boolean;
  citySlug: string;
};

function CheckLocalStorage(props: Props) {
  useEffect(() => {
    const theme = unpacData<string>("theme");

    let stop = unpacData<{ name: string; id: string }[]>(STOPS_STORAGE_KEY);
    let line = unpacData<{ name: string; id: string }[]>(LINES_STORAGE_KEY);

    if (props.theme && theme) {
      setCookies("theme", JSON.stringify(theme));
    }
    //-- Tymczasowe naprawieniei by obsługiwać stary system zapisywania danych

    const old_stop = unpacData<{ name: string; id: string }[]>(
      calculateKey(STOPS_STORAGE_KEY, props.citySlug)
    );
    const old_line = unpacData<{ name: string; id: string }[]>(
      calculateKey(LINES_STORAGE_KEY, props.citySlug)
    );

    if (old_line) {
      const key = calculateKey(LINES_STORAGE_KEY, props.citySlug)
      localStorage.removeItem(key);
      setCookies(
        calculateKey(LINES_STORAGE_KEY) as "theme" | Keys,
        JSON.stringify(old_line)
      );
      removeCookie(key as Keys)
    }

    if (old_stop) {
      const key = calculateKey(STOPS_STORAGE_KEY, props.citySlug)
      localStorage.removeItem(key);
      setCookies(
        calculateKey(STOPS_STORAGE_KEY) as "theme" | Keys,
        JSON.stringify(old_stop)
      );
      removeCookie(key as Keys)

    }
    //--

    if (props.line && line) {
      setCookies(
        calculateKey(LINES_STORAGE_KEY) as "theme" | Keys,
        JSON.stringify(line)
      );
    }

    if (props.stop && stop) {
      setCookies(
        calculateKey(STOPS_STORAGE_KEY) as "theme" | Keys,
        JSON.stringify(stop)
      );
    }
  }, [props.citySlug, props.line, props.stop, props.theme]);

  return null;
}

export default CheckLocalStorage;
