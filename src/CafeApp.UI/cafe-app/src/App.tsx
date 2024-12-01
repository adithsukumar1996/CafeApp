import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import { CafeListPage } from "./Features/Cafe/Pages/CafeListPage";
import { EmployeeListPage } from "./Features/Employee/Pages/EmployeeListPage";
import CafeEditPage from "./Features/Cafe/Pages/CafeEditPage";
import EmployeeEditPage from "./Features/Employee/Pages/EmployeeEditPage";
import Header from "./Features/Common/Components/Header";
import Footer from "./Features/Common/Components/Footer";

const Layout = () => (
  <div className="flex flex-col min-h-screen">
    <Header />
    <main className="flex-grow">
      <Outlet />
    </main>
    <Footer />
  </div>
);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<CafeListPage />} />
      <Route path="cafe" element={<CafeListPage />} />
      <Route path="cafe/edit/:id?" element={<CafeEditPage />} />
      <Route path="employee/:cafe?" element={<EmployeeListPage />} />
      <Route path="employee/edit/:id?" element={<EmployeeEditPage />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
