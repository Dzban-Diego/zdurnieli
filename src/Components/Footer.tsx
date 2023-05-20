import Link from "next/link";
import { AiOutlineGithub } from "react-icons/ai";
import { GiCoffeeCup } from "react-icons/gi";

const Footer = () => {
  return (
    <footer className={"mx-3 flex justify-between border-t-2 dark:border-white py-2"}>
      <Link href={'https://tipo.live/p/dzban-diego'} target='_blank' className={'flex items-center'}>
        <p className="dark:text-white">Postaw mi kawkę</p>
        <GiCoffeeCup className="mx-2 dark:text-white" />
      </Link>
      <Link href={"https://github.com/Dzban-Diego"} className={'flex items-center'}>
        <AiOutlineGithub className="mx-2 dark:text-white" />
        <p className="dark:text-white">Dzban-Diego</p>
      </Link>
    </footer>
  );
};

export default Footer;
