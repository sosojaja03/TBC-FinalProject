import { Footer } from "../Footer/Footer";
import { NavBar } from "../NavBar/NavBar";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <div>
      <NavBar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
