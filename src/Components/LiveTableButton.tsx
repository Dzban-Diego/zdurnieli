"use client";

import { useCallback } from "react";

const LiveTableButton = ({ html }: { html: string }) => {

  const refresh = useCallback(() => {
    window.location.reload();
  }, []);

  return (
    <div className="shadow rounded overflow-hidden">
      <div
        onClick={refresh}
        className={`flex w-full justify-center bg-white p-3 text-xl text-orange dark:bg-black`}
        dangerouslySetInnerHTML={{ __html: html || "" }}
      />
    </div>
  );
};

export default LiveTableButton;
