"use server";
import { getLiked } from "@/actions";
import SettingsList from "@/components/SettingsList";

async function Page() {
  const Stops = await getLiked("stop");
  const Lines = await getLiked("line");

  return (
    <div>
      <h2
        className={
          "my-3 text-center text-3xl text-textColor dark:text-dark_textColor"
        }
      >
        Ulubione przystanki
      </h2>
      <SettingsList list={Stops} cookieKey={"stop"} />
      <h2
        className={
          "my-3 text-center text-3xl text-textColor dark:text-dark_textColor"
        }
      >
        Ulubione linie
      </h2>
      <SettingsList list={Lines} cookieKey={"line"} />
    </div>
  );
}

export default Page;
