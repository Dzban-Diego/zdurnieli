import Link from "next/link";
import { AiOutlineGithub } from "react-icons/ai";

const Footer = () => {
  return (
    <footer className={"mx-3 flex border-t-2 dark:border-white py-2"}>
      <Link href={"https://github.com/Dzban-Diego/zdurnieli"} className={'flex items-center'}>
        <AiOutlineGithub className="mx-2 dark:text-dark_font" />
        <p className="dark:text-dark_font">Dzban-Diego</p>
      </Link>
    </footer>
  );
};

export default Footer;
