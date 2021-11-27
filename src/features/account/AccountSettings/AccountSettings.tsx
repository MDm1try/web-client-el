import Accordion from "react-bootstrap/Accordion";

import { MobileChangeForm } from "../MobileChangeForm";
import { NameChangeForm } from "../NameChangeForm";

function AccountSettings() {
  return (
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Изменить имя</Accordion.Header>
        <Accordion.Body>
          <NameChangeForm />
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Изменить мобильный телефон</Accordion.Header>
        <Accordion.Body>
          <MobileChangeForm />
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default AccountSettings;
