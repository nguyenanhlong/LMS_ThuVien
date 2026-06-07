import "./App.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from "./components/Dashboard";
import Catalog from "./components/Catalog";
import CatalogDetail from "./components/CatalogDetail";
import CatalogReserve from "./components/CatalogReserve";
import Readers from "./components/Readers";
import Notifications from "./components/Notifications";
import Loans from "./components/Loans";
import LoansCreate from "./components/LoansCreate";
import Report from "./components/Report";
import SearchDocument from "./components/SearchDocument";
import AuditLog from "./components/AuditLog";
import ChangePassword from "./components/ChangePassword";
import Fines from "./components/Fines";
import LoanDetail from "./components/LoanDetail";
import Login from "./components/Login";
import Profile from "./components/Profile";
import ReaderDetail from "./components/ReaderDetail";
import RenewLoan from "./components/RenewLoan";
import ReturnBook from "./components/ReturnBook";
import StatisticsCharts from "./components/StatisticsCharts";
import SupplierDetail from "./components/SupplierDetail";
import Suppliers from "./components/Suppliers";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/catalog/:code" element={<CatalogDetail />} />
        <Route path="/catalog/:code/reserve" element={<CatalogReserve />} />
        <Route path="/readers" element={<Readers />} />
        <Route path="/readers/:id" element={<ReaderDetail />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/search" element={<SearchDocument />} />
        <Route path="/loans" element={<Loans />} />
        <Route path="/loans/create" element={<LoansCreate />} />
        <Route path="/loans/return" element={<ReturnBook />} />
        <Route path="/loans/renew" element={<RenewLoan />} />
        <Route path="/loans/:id" element={<LoanDetail />} />
        <Route path="/fines" element={<Fines />} />
        <Route path="/reports" element={<Report />} />
        <Route path="/reports/charts" element={<StatisticsCharts />} />
        <Route path="/suppliers" element={<Suppliers />} />
        <Route path="/suppliers/:id" element={<SupplierDetail />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/audit-log" element={<AuditLog />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
