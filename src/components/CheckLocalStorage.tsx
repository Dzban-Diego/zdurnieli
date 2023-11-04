"use client";
import { useEffect } from "react";
import { setCookies } from "@/actions";
import { Keys, LINES_STORAGE_KEY, STOPS_STORAGE_KEY } from "@/config";

type Props = {
  line: boolean;
  stop: boolean;
  theme: boolean;
  citySlug: string;
};

function calculateKey(key: string, city?: string) {
  if (city) {
    return `${key}-${city.length > 2 ? "zs" : city}`;
  }
  return key;
}

function CheckLocalStorage(props: Props) {
  useEffect(() => {
    const theme = unpacData<string>(localStorage.getItem("theme"));

    const stop = unpacData<{ name: string; id: string }[]>(
      localStorage.getItem(calculateKey(STOPS_STORAGE_KEY, props.citySlug))
    );
    const line = unpacData<{ name: string; id: string }[]>(
      localStorage.getItem(calculateKey(LINES_STORAGE_KEY, props.citySlug))
    );

    if (props.theme && theme) {
      setCookies("theme", JSON.stringify(theme));
    }

    if (props.line && line) {
      setCookies(
        calculateKey(LINES_STORAGE_KEY, props.citySlug) as "theme" | Keys,
        JSON.stringify(line)
      );
    }

    if (props.stop && stop) {
      setCookies(
        calculateKey(STOPS_STORAGE_KEY, props.citySlug) as "theme" | Keys,
        JSON.stringify(stop)
      );
    }
  }, [props.citySlug, props.line, props.stop, props.theme]);

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
