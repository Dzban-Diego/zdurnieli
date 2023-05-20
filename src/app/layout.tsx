import Footer from "@/Components/Footer";

type Props = {
  children: React.ReactNode;
};

export const metadata = {
  title: "Zaraz będę",
};

const MyApp: React.FC<Props> = ({ children }) => {
  return (
    <div className={"h-full"}>
      <header
        className={"mx-3 flex justify-between border-b-2 dark:border-white"}
      >
        <h1 className={"p-4 text-4xl font-medium text-black dark:text-white"}>
          Zaraz będę
        </h1>
      </header>
      <main
        className={"m-3 bg-background min-h-screen dark:bg-dark_background"}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MyApp;
