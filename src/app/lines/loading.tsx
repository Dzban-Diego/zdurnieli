import { Multiple } from "@/components/Multiple";

export default function Loading() {
  return (
    <div className={"grid grid-cols-4"}>
      <Multiple instances={64}>
        <div className={"m-1 h-10 animate-pulse bg-loading p-2 text-2xl rounded"} />
      </Multiple>
    </div>
  );
}
