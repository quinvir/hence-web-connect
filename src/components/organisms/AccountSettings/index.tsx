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
import { useUserStore } from "../../../stores/userStore";
import { useEffect, useState } from "react";
import { updateUserProfile } from "../../../api/auth/profile.api";
import { logout, withdrawUser } from "../../../api/auth/auth.api";

type AlertType = "confirmOnly" | "cancelConfirm" | "warning" | null;

const AccountSettings = () => {
  const navigate = useNavigate();
  const { user, updateUser, clearUser } = useUserStore();

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertTitle, setAlertTitle] = useState("알림");
  const [alertMessage, setAlertMessage] = useState<string | string[]>([]);
  const [alertType, setAlertType] = useState<AlertType>(null);
  const [onConfirm, setOnConfirm] = useState<() => void>(() => () => {});
  const [onCancel, setOnCancel] = useState<() => void>(() => () => {});
  const [confirmText, setConfirmText] = useState("확인");
  const [cancelText, setCancelText] = useState("취소");

  const showAlert = (
    type: AlertType,
    title: string,
    message: string | string[],
    onConfirmCallback?: () => void,
    onCancelCallback?: () => void,
    confirmTextOverride?: string,
    cancelTextOverride?: string
  ) => {
    setAlertType(type);
    setAlertTitle(title);
    setAlertMessage(message);
    setOnConfirm(() => onConfirmCallback || handleAlertClose);
    setOnCancel(() => onCancelCallback || handleAlertClose);
    setConfirmText(confirmTextOverride || "확인");
    setCancelText(cancelTextOverride || "취소");
    setAlertOpen(true);
  };

  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  const [localConsent, setLocalConsent] = useState<boolean>(
    user?.marketingConsent ?? false
  );

  useEffect(() => {
    if (typeof user?.marketingConsent === "boolean") {
      setLocalConsent(user.marketingConsent);
    }
  }, [user?.marketingConsent]);

  const handleMarketingToggle = async () => {
    if (!user) return;

    const nextConsent = !localConsent;
    setLocalConsent(nextConsent);

    try {
      await updateUserProfile({ marketingConsent: nextConsent });
      updateUser({ marketingConsent: nextConsent });

      showAlert(
        "confirmOnly",
        "마케팅 수신 설정",
        nextConsent
          ? "마케팅 수신 동의가 활성화되었습니다."
          : "마케팅 수신 동의가 해제되었습니다."
      );
    } catch (error) {
      showAlert("confirmOnly", "오류", "마케팅 수신 동의 변경에 실패했어요.");
    }
  };

  const handleLogout = () => {
    if (!user) return;
    console.log(user);

    showAlert(
      "cancelConfirm",
      "알림",
      "지금 로그아웃 하시겠습니까?",
      async () => {
        try {
          await logout();
          clearUser();
          showAlert("confirmOnly", "알림", "로그아웃 되었습니다.", () =>
            navigate("/")
          );
        } catch (err) {
          showAlert("confirmOnly", "오류", [
            "로그아웃에 실패했습니다.",
            "잠시 후 다시 시도해 주세요.",
          ]);
        }
      }
    );
  };

  const handleWithdraw = () => {
    if (!user) return;

    showAlert(
      "warning",
      "알림",
      [
        "지금 탈퇴하시겠어요?",
        "회원탈퇴를 진행하시면",
        "회원님의 정보는 모두 삭제되요 😭",
        "그래도 회원탈퇴를 하시겠어요?",
      ],
      async () => {
        try {
          await withdrawUser();
          clearUser();
          showAlert("confirmOnly", "알림", "회원탈퇴가 완료되었습니다.", () =>
            navigate("/")
          );
        } catch (err) {
          showAlert("confirmOnly", "오류", [
            "회원 탈퇴에 실패했습니다.",
            "잠시 후 다시 시도해 주세요.",
          ]);
        }
      },
      undefined,
      "회원탈퇴"
    );
  };

  return (
    <Wrapper>
      <Title>계정 설정</Title>
      <MenuList>
        <MenuItem>
          <Label>마케팅 수신 동의</Label>
          <ToggleSwitch
            checked={localConsent}
            onChange={handleMarketingToggle}
          />
        </MenuItem>
        <MenuItem>
          <ClickableText onClick={handleLogout}>로그아웃 하기</ClickableText>
        </MenuItem>
        <MenuItem>
          <WithdrawButton onClick={handleWithdraw}>회원 탈퇴</WithdrawButton>
        </MenuItem>
      </MenuList>

      {alertOpen && alertType && (
        <AlertModal
          type={alertType}
          title={alertTitle}
          message={alertMessage}
          confirmText={confirmText}
          cancelText={cancelText}
          onConfirm={onConfirm}
          onCancel={alertType === "cancelConfirm" ? onCancel : undefined}
        />
      )}
    </Wrapper>
  );
};

export default AccountSettings;
