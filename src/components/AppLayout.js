import { Outlet } from "react-router-dom";

// IMPORT COMPONENTS
import Footer from "./Footer";
import Header from "./Header";

// APP LAYOUT COMPONENT
function AppLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

export default AppLayout;