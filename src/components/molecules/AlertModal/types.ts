export interface AlertModalProps {
  title?: string;
  message: string;
  type: "confirmOnly" | "cancelConfirm" | "warning";
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel?: () => void;
}
