import { createBrowserRouter } from "react-router";
import { Root } from "./Root";
import { HomePage } from "./pages/HomePage";
import { BookingPage } from "./pages/BookingPage";
import { ProfilePage } from "./pages/ProfilePage";
import { AdminDashboard } from "./pages/AdminDashboard";
import { AnalyticsPage } from "./pages/AnalyticsPage";
import { TariffsPage } from "./pages/TariffsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: HomePage },
      { path: "tariffs", Component: TariffsPage },
      { path: "booking/:pc_id", Component: BookingPage },
      { path: "profile", Component: ProfilePage },
      { path: "admin/dashboard", Component: AdminDashboard },
      { path: "admin/analytics", Component: AnalyticsPage },
    ],
  },
]);
