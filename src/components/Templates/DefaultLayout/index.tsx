import Header from "../../organisms/Header";

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header variant="main" />
      <main className="pt-16">{children}</main>
    </>
  );
};

export default DefaultLayout;
