export default function Loading() {
	return (
		<div className="animate-pulse flex flex-col">
			<span
				className={
					"p-4 text-2xl self-center text-textColor dark:text-dark_textColor"
				}
			>
				Ładowanie...
			</span>
			<div className={"h-48 w-full bg-loading rounded"} />
		</div>
	);
}
