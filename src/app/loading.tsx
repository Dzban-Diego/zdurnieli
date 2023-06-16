const Loading = () => {
  return (
    <div className="flex flex-col p-2">
      <h2
        className={
          "flex justify-center text-3xl text-textColor dark:text-dark_textColor"
        }
      >
        Ulubione przystanki
      </h2>
      <div
        className={
          "flex items-center justify-between self-center h-64 w-full rounded bg-gray animate-pulse mt-5"
        }
      />
      <div
        className={
          "flex items-center justify-between self-center h-64 w-full rounded bg-gray animate-pulse mt-5"
        }
      />
      <h2
        className={
          "my-3 flex justify-center text-3xl text-textColor dark:text-dark_textColor"
        }
      >
        Ulubione Linie
      </h2>
      <div className={"grid grid-cols-4"}>
        <div
          className={`m-1 rounded-md p-3 shadow-md bg-gray animate-pulse h-12`}
        />
        <div
          className={`m-1 rounded-md p-3 shadow-md bg-gray animate-pulse h-12`}
        />
        <div
          className={`m-1 rounded-md p-3 shadow-md bg-gray animate-pulse h-12`}
        />
      </div>
    </div>
  );
};

export default Loading;
