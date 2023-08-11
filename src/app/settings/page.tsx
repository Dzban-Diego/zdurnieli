import { getLiked } from "@/actions";
import { CustomLink } from "@/components/CustomLink";
import SettingsList from "@/components/SettingsList";
import { LINES_STORAGE_KEY, STOPS_STORAGE_KEY } from "@/config";

async function Page() {
  const Stops = await getLiked(STOPS_STORAGE_KEY);
  const Lines = await getLiked(LINES_STORAGE_KEY);

  return (
    <div className="flex flex-col">
      <h2>Ulubione przystanki</h2>
      <SettingsList list={Stops} cookieKey={STOPS_STORAGE_KEY} />
      <h2>Ulubione linie</h2>
      <SettingsList list={Lines} cookieKey={LINES_STORAGE_KEY} />
      <CustomLink
        href={"/export"}
        text={"Export/Import"}
        className="mt-4 m-0"
      />
    </div>
  );
}

export default Page;
