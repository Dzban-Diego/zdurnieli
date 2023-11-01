import { Analytics } from '@vercel/analytics/react';
import "./globals.css";
import Footer from "@/components/Footer";
import ChangeThemeButton from "@/components/ChangeThemeButton";
import { cookies } from "next/headers";
import Link from "next/link";
import { RiSettings4Fill } from "react-icons/ri";
import { PropsWithChildren } from "react";

export const metadata = {
  title: "Zaraz będę",
  description: "Przestań spóźniać się na przystanki. Z Zaraz będę nigdy nie przeoczysz odjazdu!",
  applicationName: "Zaraz będę",
  icons: ["app-icon.png"],
  appleWebApp: {
    title: "Zaraz będę",
    statusBarStyle: "black-translucent",
  },
  other: {
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "black",
    appleTouchIcon: "/apple-icon.png",
  },
};

export default function MyApp({ children }: PropsWithChildren) {
  const cookieStore = cookies();
  const theme = cookieStore.get("theme")?.value === "dark" ? "dark" : "light";

  return (
    <html lang={"pl"} className={theme}>
      <body className={`bg-background dark:bg-dark_background h-full`}>
        <header
          className={"mx-3 flex justify-between border-b-2 dark:border-white"}
        >
          <Link href={"/"}>
            <h1
              className={"p-4 text-4xl font-medium text-black dark:text-white"}
            >
              Zaraz będę
            </h1>
          </Link>
          <div className="flex flex-row items-center">
            <Link href={"/settings"} className="p-4">
              <RiSettings4Fill
                size={35}
                color={theme === "dark" ? "white" : "black"}
              />
            </Link>
            <ChangeThemeButton theme={theme} />
          </div>
        </header>
        <main
          className={"m-3 bg-background min-h-screen dark:bg-dark_background"}
        >
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
