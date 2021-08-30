import Link from "next/link";
import useTranslation from "next-translate/useTranslation";

import css from "./Header.module.css";

function Header() {
  const { t } = useTranslation(`common`);

  return (
    <nav className={`${css.container} navbar navbar-expand-lg navbar-light `}>
      <div className="container-fluid">
        <Link href="/">
          <a className="navbar-brand btn" style={{ color: `#fff` }}>
            Easy Land
          </a>
        </Link>

        <div className="d-flex">
          <Link href="/" locale="ua">
            <a className="nav-link link-light">UA</a>
          </Link>
          <div className="py-2">|</div>
          <Link href="/" locale="rus">
            <a className="nav-link link-light">RUS</a>
          </Link>
          <Link href="/account">
            <a className={`${css.btnMyAccount} btn`}>{t(`my-profile`)}</a>
          </Link>
          <Link href="/post/new-ad">
            <a className="btn btn-outline-light">{t(`post-an-ad`)}</a>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Header;
