import ReactDOM from "react-dom";
import {
  Overlay,
  ModalContainer,
  Title,
  Message,
  ButtonGroup,
  Button,
  TextBox,
} from "./styles";
import { AlertModalProps } from "./types";

const AlertModal = ({
  title = "알림",
  message,
  type = "confirmOnly",
  confirmText = "확인",
  cancelText = "취소",
  onConfirm,
  onCancel,
}: AlertModalProps) => {
  const handleCancel = () => {
    if (onCancel) onCancel();
  };

  const handleConfirm = () => {
    if (onConfirm) onConfirm();
  };

  return ReactDOM.createPortal(
    <Overlay>
      <ModalContainer>
        <TextBox>
          <Title>{title}</Title>
          <Message>{message}</Message>
        </TextBox>
        <ButtonGroup $type={type}>
          {type !== "confirmOnly" && (
            <Button onClick={handleCancel} $variant="cancel">
              {cancelText}
            </Button>
          )}
          <Button
            onClick={handleConfirm}
            $variant={type === "warning" ? "warning" : "confirm"}
            $only={type === "confirmOnly"}
          >
            {confirmText}
          </Button>
        </ButtonGroup>
      </ModalContainer>
    </Overlay>,
    document.body
  );
};

export default AlertModal;
