import "./globals.css";
import Footer from "@/Components/Footer";
import ChangeThemeButton from "@/Components/ChangeThemeButton";
import { cookies } from "next/headers";

type Props = {
  children: React.ReactNode;
};

export const metadata = {
  title: "Zaraz będę",
};

const MyApp: React.FC<Props> = ({ children }) => {
  const cookieStore = cookies();
  const theme = cookieStore.get("theme")?.value === 'dark' ? 'dark' : "light";

  return (
    <html lang={"pl"} className={theme}>
      <body className={`bg-background dark:bg-dark_background h-full`}>
        <header
          className={"mx-3 flex justify-between border-b-2 dark:border-white"}
        >
          <h1 className={"p-4 text-4xl font-medium text-black dark:text-white"}>
            Zaraz będę
          </h1>
          <ChangeThemeButton theme={theme} />
        </header>
        <main
          className={"m-3 bg-background min-h-screen dark:bg-dark_background"}
        >
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
};

export default MyApp;
