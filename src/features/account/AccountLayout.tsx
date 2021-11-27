import Nav from "react-bootstrap/Nav";

import { NavLink } from "@/components/NavLink";

type Props = {
  children: JSX.Element;
};

function AccountLayout({ children }: Props) {
  return (
    <div className="container-md mt-4 py-3 bg-white rounded-3">
      <Nav variant="tabs" defaultActiveKey="/account" className="mb-3">
        <Nav.Item>
          <NavLink href="/account">Объявления</NavLink>
        </Nav.Item>
        <Nav.Item>
          <NavLink href="/account/settings">Настройки</NavLink>
        </Nav.Item>
      </Nav>
      {children}
    </div>
  );
}

export default AccountLayout;
