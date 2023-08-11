import { getLiked } from "@/actions";
import SettingsList from "@/components/SettingsList";
import { LINES_STORAGE_KEY, STOPS_STORAGE_KEY } from "@/config";

async function Page() {
  const Stops = await getLiked(STOPS_STORAGE_KEY);
  const Lines = await getLiked(LINES_STORAGE_KEY);

  return (
    <div>
      <h2
        className={
          "my-3 text-center text-3xl text-textColor dark:text-dark_textColor"
        }
      >
        Ulubione przystanki
      </h2>
      <SettingsList list={Stops} cookieKey={STOPS_STORAGE_KEY} />
      <h2
        className={
          "my-3 text-center text-3xl text-textColor dark:text-dark_textColor"
        }
      >
        Ulubione linie
      </h2>
      <SettingsList list={Lines} cookieKey={LINES_STORAGE_KEY} />
    </div>
  );
}

export default Page;
