import { useState } from "react";
import { Container, ContentBox, InnerBox } from "./styles";
import SettingsSidebar from "../../organisms/SettingsSideBar";
import AccountSettings from "../../organisms/AccountSettings";
import TextPolicySection from "../../organisms/TextPolicySection";
import {
  MARKETING_TEXT,
  PRIVACY_TEXT,
  TERMS_TEXT,
} from "../../../constants/terms";

type MenuKey = "account" | "terms" | "privacy" | "marketing" | "version";

const SettingsTemplate = () => {
  const [selectedMenu, setSelectedMenu] = useState<MenuKey>("account");

  return (
    <Container>
      <h1>설정</h1>
      <InnerBox>
        <SettingsSidebar selected={selectedMenu} onSelect={setSelectedMenu} />
        <ContentBox>
          {selectedMenu === "account" && <AccountSettings />}
          {selectedMenu === "terms" && (
            <TextPolicySection title="서비스 이용 약관" text={TERMS_TEXT} />
          )}
          {selectedMenu === "privacy" && (
            <TextPolicySection title="개인정보 처리방침" text={PRIVACY_TEXT} />
          )}
          {selectedMenu === "marketing" && (
            <TextPolicySection title="마케팅 수신 동의" text={MARKETING_TEXT} />
          )}
        </ContentBox>
      </InnerBox>
    </Container>
  );
};

export default SettingsTemplate;
