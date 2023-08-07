import Image from "next/image";

const Loading = () => {
  return (
    <div className="relative flex flex-col items-center w-full mt-32">
      <div className="overflow-hidden w-[200px]">
        <div className="w-[600px] animate-ground">
          <Image src="/roud.png" alt="loading" width={600} height={0} />
        </div>
      </div>

      <div className="absolute top-2 animate-drive">
        <Image
          src="/bus.png"
          alt="loading"
          width={50}
          height={0}
          className=""
        />
      </div>
      <span className="mt-10 animate-pulse">Ładowanie..</span>
    </div>
  );
};

export default Loading;
