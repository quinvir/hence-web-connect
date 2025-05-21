import { useUserStore } from "../../stores/userStore";
import Avatar from "../atoms/Avatar";

const UserMenu = () => {
  const profileImage = useUserStore((state) => state.profileImage);

  return (
    <div className="relative">
      <Avatar src={profileImage ?? undefined} alt="유저" />
    </div>
  );
};

export default UserMenu;
