"use client";
import { useRouter } from 'next/navigation'

type Props = {
  line: string;
  direction: string;
  time: string;
};

function StopCard({ line, direction, time }: Props) {
  const router = useRouter();

  return (
    <div
      className={
        "text-black dark:text-neutral-400 p-3 text-xl font-bold flex justify-between"
      }
      onClick={router.refresh}
    >
      <span>{line}</span>
      <span>{direction}</span>
      <span>{time}</span>
    </div>
  );
}

export default StopCard;
