export interface AlertModalProps {
  title?: string;
  message: string | string[] | React.ReactNode;
  type: "confirmOnly" | "cancelConfirm" | "warning";
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel?: () => void;
}
