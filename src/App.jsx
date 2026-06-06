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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/catalog/:code" element={<CatalogDetail />} />
        <Route path="/catalog/:code/reserve" element={<CatalogReserve />} />
        <Route path="/readers" element={<Readers />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/search" element={<SearchDocument />} />
        <Route path="/loans" element={<Loans />} />
        <Route path="/loans/create" element={<LoansCreate />} />
        <Route path="/reports" element={<Report />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;