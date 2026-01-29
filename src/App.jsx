import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { LoanProvider } from './context/LoanContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import LoanApplication from './pages/LoanApplication';
import BankStats from './pages/BankStats';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <Router>
      <AuthProvider>
        <LoanProvider>
          <div className="min-h-screen bg-background text-text font-sans">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard/*" element={<Dashboard />} />
              <Route path="/apply" element={<LoanApplication />} />
              <Route path="/banks" element={<BankStats />} />
            </Routes>
            <Toaster position="top-right" />
          </div>
        </LoanProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
