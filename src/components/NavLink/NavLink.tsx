import Link from "next/link";
import { useRouter } from "next/router";
import classcat from "classcat";

type Props = {
  href: string;
  children: React.ReactNode;
};

function NavLink({ href, children }: Props) {
  const { asPath } = useRouter();
  const active = href === asPath;
  return (
    <Link href={href}>
      <a className={classcat([`nav-link`, { active }])}>{children}</a>
    </Link>
  );
}

export default NavLink;
