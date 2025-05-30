import { useState } from "react";
import {
  Wrapper,
  Title,
  MenuList,
  MenuItem,
  Label,
  ClickableText,
  WithdrawButton,
} from "./styles";
import ToggleSwitch from "../../molecules/ToggleSwitch";
import { useNavigate } from "react-router-dom";
import AlertModal from "../../molecules/AlertModal";

const AccountSettings = () => {
  const navigate = useNavigate();

  const [marketingConsent, setMarketingConsent] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertTitle, setAlertTitle] = useState("알림");
  const [alertMessage, setAlertMessage] = useState<string | string[]>([]);

  const showAlert = (title: string, message: string | string[]) => {
    setAlertTitle(title);
    setAlertMessage(message);
    setAlertOpen(true);
  };

  const handleAlertConfirm = () => {
    setAlertOpen(false);
  };

  const handleLogout = () => {
    console.log("로그아웃");
  };

  const handleWithdraw = () => {
    setIsModalOpen(true);
  };

  const confirmWithdraw = () => {
    setIsModalOpen(false);
    console.log("회원 탈퇴");
  };

  return (
    <Wrapper>
      <Title>계정 설정</Title>
      <MenuList>
        <MenuItem>
          <Label>마케팅 수신 동의</Label>
          <ToggleSwitch
            checked={marketingConsent}
            onChange={() => setMarketingConsent(!marketingConsent)}
          />
        </MenuItem>
        <MenuItem>
          <ClickableText onClick={handleLogout}>로그아웃 하기</ClickableText>
        </MenuItem>
        <MenuItem>
          <WithdrawButton onClick={handleWithdraw}>회원 탈퇴</WithdrawButton>
        </MenuItem>
      </MenuList>

      {alertOpen && (
        <AlertModal
          type="cancelConfirm"
          title={alertTitle}
          message={alertMessage}
          onConfirm={handleAlertConfirm}
          onCancel={handleAlertConfirm}
        />
      )}
    </Wrapper>
  );
};

export default AccountSettings;
