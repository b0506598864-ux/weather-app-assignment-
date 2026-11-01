import { NavLink, Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <div className="app" dir="rtl">
      <header className="site-header">
        <h1>מזג האוויר בישראל</h1>

        <nav aria-label="תפריט ראשי">
          <NavLink to="/" end>
            בית
          </NavLink>
          <NavLink to="/history">היסטוריה</NavLink>
          <NavLink to="/about">אודות</NavLink>
        </nav>
      </header>

      <main className="page">
        <Outlet />
      </main>
    </div>
  );
}
