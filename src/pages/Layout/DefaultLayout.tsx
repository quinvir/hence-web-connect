import { Outlet } from "react-router-dom";
import Header from "../../components/organisms/Header";

const DefaultLayout = () => {
  return (
    <>
      <Header variant="main" />
      <main className="pt-16">
        <Outlet />
      </main>
    </>
  );
};

export default DefaultLayout;
