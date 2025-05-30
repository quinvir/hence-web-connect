import { useUserStore } from "../../../stores/userStore";
import { MenuItem, MenuList, Title, Wrapper } from "./styles";

type MenuKey = "account" | "terms" | "privacy" | "marketing" | "version";

interface SettingsSidebarProps {
  selected: MenuKey;
  onSelect: (key: MenuKey) => void;
}

const menuItems: { key: MenuKey; label: string; disabled?: boolean }[] = [
  { key: "account", label: "계정 설정" },
  { key: "terms", label: "서비스 이용약관" },
  { key: "privacy", label: "개인정보 처리방침" },
  { key: "marketing", label: "마케팅 수신 동의" },
  { key: "version", label: "버전 1.0.0", disabled: true },
];

const SettingsSidebar = ({ selected, onSelect }: SettingsSidebarProps) => {
  const { user } = useUserStore();

  return (
    <Wrapper>
      <Title>메뉴</Title>
      <MenuList>
        {menuItems.map((item) => {
          if (item.key === "account" && !user) return null;

          return (
            <MenuItem
              key={item.key}
              $active={selected === item.key}
              $disabled={item.disabled}
              onClick={() => {
                if (!item.disabled) {
                  onSelect(item.key);
                }
              }}
            >
              {item.label}
            </MenuItem>
          );
        })}
      </MenuList>
    </Wrapper>
  );
};

export default SettingsSidebar;
