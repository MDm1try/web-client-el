import Accordion from "react-bootstrap/Accordion";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

import { ACCOUNT_TABS_MAP } from "@/constants";
import { MobileChangeForm } from "../MobileChangeForm";

function AccountTabs() {
  return (
    <Tabs defaultActiveKey={ACCOUNT_TABS_MAP.POSTS} className="mb-3">
      <Tab eventKey={ACCOUNT_TABS_MAP.POSTS} title="Объявления">
        Объявления
      </Tab>
      <Tab eventKey={ACCOUNT_TABS_MAP.SETTINGS} title="Настройки">
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Изменить имя</Accordion.Header>
            <Accordion.Body>NameChangeForm</Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Изменить мобильный телефон</Accordion.Header>
            <Accordion.Body>
              <MobileChangeForm />
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Tab>
    </Tabs>
  );
}

export default AccountTabs;
