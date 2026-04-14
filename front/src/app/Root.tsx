import { Outlet } from "react-router";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { AppProvider } from "./context/AppContext";

export function Root() {
  return (
    <AppProvider>
      <div className="min-h-screen flex flex-col bg-[#0A0F3D] text-[#F5F5F5] font-sans">
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </AppProvider>
  );
}
