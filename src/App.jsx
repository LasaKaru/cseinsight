import { Routes, Route } from 'react-router-dom';
import { useTheme } from './context/ThemeContext';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import WikiPage from './pages/WikiPage';
import ChatbotPage from './pages/ChatbotPage';
import RAGPage from './pages/RAGPage';
import PredictionPage from './pages/PredictionPage';
import CompanyPage from './pages/CompanyPage';
import DividendCalendarPage from './pages/DividendCalendarPage';
import BrokersPage from './pages/BrokersPage';
import CompaniesPage from './pages/CompaniesPage';

// Components
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  const { isDark } = useTheme();

  return (
    <div className={`min-h-screen ${isDark ? 'bg-[#0a0e27]' : 'bg-gray-50'}`}>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/wiki" element={<WikiPage />} />
        <Route path="/wiki/:topic" element={<WikiPage />} />
        <Route path="/brokers" element={<BrokersPage />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/chatbot"
          element={
            <ProtectedRoute>
              <ChatbotPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/document-analyzer"
          element={
            <ProtectedRoute>
              <RAGPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/predictions"
          element={
            <ProtectedRoute>
              <PredictionPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/company/:symbol"
          element={
            <ProtectedRoute>
              <CompanyPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/companies"
          element={
            <ProtectedRoute>
              <CompaniesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dividend-calendar"
          element={
            <ProtectedRoute>
              <DividendCalendarPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
