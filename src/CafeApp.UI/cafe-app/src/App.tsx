import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CafeListPage } from "./Features/Cafe/Pages/CafeListPage";
import { EmployeeListPage } from "./Features/Employee/Pages/EmployeeListPage";
import CafeEditPage from "./Features/Cafe/Pages/CafeEditPage";
import EmployeeEditPage from "./Features/Employee/Pages/EmployeeEditPage";
import Header from "./Features/Common/Components/Header";
import Footer from "./Features/Common/Components/Footer";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<CafeListPage />} />
            <Route path="/cafe" element={<CafeListPage />} />
            <Route path="/cafe/edit/:id?" element={<CafeEditPage />} />
            <Route path="/employee/:cafe?" element={<EmployeeListPage />} />
            <Route path="/employee/edit/:id?" element={<EmployeeEditPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
