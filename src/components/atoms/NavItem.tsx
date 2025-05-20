import { Link, useLocation } from "react-router-dom";

interface NavItemProps {
  to: string;
  icon?: React.ReactNode;
  label: string;
}

const NavItem = ({ to, icon, label }: NavItemProps) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`flex flex-col items-center gap-1 text-xs ${
        isActive ? "text-purple-500" : "text-gray-400"
      }`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
};

export default NavItem;
