import "./App.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';
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

import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const authUser = localStorage.getItem('authUser');
  if (!authUser) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/catalog" element={<ProtectedRoute><Catalog /></ProtectedRoute>} />
          <Route path="/catalog/:code" element={<ProtectedRoute><CatalogDetail /></ProtectedRoute>} />
          <Route path="/catalog/:code/reserve" element={<ProtectedRoute><CatalogReserve /></ProtectedRoute>} />
          <Route path="/readers" element={<ProtectedRoute><Readers /></ProtectedRoute>} />
          <Route path="/readers/:id" element={<ProtectedRoute><ReaderDetail /></ProtectedRoute>} />
          <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
          <Route path="/search" element={<ProtectedRoute><SearchDocument /></ProtectedRoute>} />
          <Route path="/loans" element={<ProtectedRoute><Loans /></ProtectedRoute>} />
          <Route path="/loans/create" element={<ProtectedRoute><LoansCreate /></ProtectedRoute>} />
          <Route path="/loans/return" element={<ProtectedRoute><ReturnBook /></ProtectedRoute>} />
          <Route path="/loans/renew" element={<ProtectedRoute><RenewLoan /></ProtectedRoute>} />
          <Route path="/loans/:id" element={<ProtectedRoute><LoanDetail /></ProtectedRoute>} />
          <Route path="/fines" element={<ProtectedRoute><Fines /></ProtectedRoute>} />
          <Route path="/reports" element={<ProtectedRoute><Report /></ProtectedRoute>} />
          <Route path="/reports/charts" element={<ProtectedRoute><StatisticsCharts /></ProtectedRoute>} />
          <Route path="/suppliers" element={<ProtectedRoute><Suppliers /></ProtectedRoute>} />
          <Route path="/suppliers/:id" element={<ProtectedRoute><SupplierDetail /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/change-password" element={<ProtectedRoute><ChangePassword /></ProtectedRoute>} />
          <Route path="/audit-log" element={<ProtectedRoute><AuditLog /></ProtectedRoute>} />
        </Routes>
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App;
