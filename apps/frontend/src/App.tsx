import "./App.css";
import AppLayout from "./components/layouts/AppLayout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import EventsPage from "./pages/events/EventsPage";
import CreateEventPage from "./pages/events/CreateEventPage";
import SingleEventPage from "./pages/events/SingleEventPage";
import NotFoundPage from "./pages/NotFoundPage";
import FormsPage from "./pages/savedForms/SavedFormsPage";
import SingleFormPage from "./pages/savedForms/SingleFormPage";
import DevicesPage from "./pages/devices/DevicesPage";
import ConsentFormsPage from "./pages/consentForms/ConsentFormsPage";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat"; // For strict parsing

dayjs.extend(customParseFormat);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="" element={<AppLayout />}>
            <Route path="/events" element={<EventsPage />} />
            <Route path="/events/create" element={<CreateEventPage />} />
            <Route path="/events/:id" element={<SingleEventPage />} />
            <Route path="/forms" element={<FormsPage />} />
            <Route path="/forms/:id" element={<SingleFormPage />} />
            <Route path="/forms/create" element={<SingleFormPage />} />
            <Route path="/consent-forms" element={<ConsentFormsPage />} />
            <Route path="/devices" element={<DevicesPage />} />
            {/* 404 */}
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
