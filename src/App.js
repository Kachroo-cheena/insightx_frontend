import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterSelection from './components/RegisterSelection';
import RegisterForm from './components/RegisterForm';
import Login from './components/Login';
import Layout from './components/Layout';
import PatientDetailsPage from './components/DetailsSuccess';
import AllReportsPage from './components/AllReportsPage';
import TemplatesPage from './components/Templates';
import ProtectedRoute from './components/ProtectedRoute'; // Import ProtectedRoute

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterSelection />} />
        
        {/* All routes inside this layout will be protected */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <Layout>
                <Routes>
                  <Route path="/register/:role" element={<RegisterForm />} />
                  <Route path="/patient-details" element={<PatientDetailsPage />} />
                  <Route path="/reports" element={<AllReportsPage />} />
                  <Route path="/templates" element={<TemplatesPage />} />
                </Routes>
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
