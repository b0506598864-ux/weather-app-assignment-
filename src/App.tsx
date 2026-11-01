import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { HistoryProvider } from "./context/HistoryContext";
import AppLayout from "./components/AppLayout";
import HomePage from "./pages/HomePage";
import HistoryPage from "./pages/HistoryPage";
import AboutPage from "./pages/AboutPage";

export default function App() {
  return (
    <HistoryProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route
              path="*"
              element={
                <section>
                  <h2>הדף לא נמצא</h2>
                  <Link to="/">חזרה לבית</Link>
                </section>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </HistoryProvider>
  );
}
