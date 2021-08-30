import Link from "next/link";

export const ACCOUNT_TABS_MAP = {
  POSTS: `posts`,
  SETTINGS: `settings`,
};

type Props = {
  activeTab: string;
};

function AccountTabs({ activeTab = ACCOUNT_TABS_MAP.POSTS }: Props) {
  return (
    <div className="container-md mt-4">
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <Link
            href={{
              pathname: `/account`,
              query: { tab: ACCOUNT_TABS_MAP.POSTS },
            }}
          >
            <a className="nav-link active" aria-current="page">
              Объявления
            </a>
          </Link>
        </li>
        <li className="nav-item">
          <Link
            href={{
              pathname: `/account`,
              query: { tab: ACCOUNT_TABS_MAP.SETTINGS },
            }}
          >
            <a className="nav-link">Настройки</a>
          </Link>
        </li>
      </ul>
      <div>{activeTab}</div>
    </div>
  );
}

export default AccountTabs;
