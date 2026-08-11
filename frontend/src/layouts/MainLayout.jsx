import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function MainLayout() {
  return (
    <div className="layout-wrapper">
      <Navbar />

      <main className="page-container">
        <Outlet />
      </main>

      <footer className="footer-placeholder">
        <p>&copy; {new Date().getFullYear()} CarFix – Car Repairing & Services. All rights reserved.</p>
      </footer>
    </div>
  );
}
