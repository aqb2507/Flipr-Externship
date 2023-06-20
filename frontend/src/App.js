import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import Home from './pages/Home';
import Login from './pages/Login';
import Footer from './pages/Footer';
import Register from './pages/admin/Register';
import Employees from './pages/admin/Employees';
import AdminDashboard from './pages/admin/Dashboard';
import CreateTask from './pages/employee/CreateTask';
import EmployeeDashboard from './pages/employee/Dashboard';
import Admin from './components/Admin';
import Employee from './components/Employee';

const AdminLayout = () => (
  <div>
    <h1 className="hidden">Admin Layout</h1>
    {/* <AdminDashboard /> */}
    <Outlet />
  </div>
);

const EmployeeLayout = () => (
  <div>
    <h1 className="hidden">Employee Layout</h1>
    <Outlet />
  </div>
);

const PublicLayout = () => (
  <div>
    <h1 className="hidden">Public Layout</h1>
    <Outlet />
  </div>
);

function App() {
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="app min-h-screen">
      <Router>
        <Routes>
          {/* Admin Routes */}
          <Route element={<AdminLayout />}>
            {/* Admin Routes */}
            <Route
              path="admin/register"
              element={user ? <Register /> : <Navigate replace to="/login" />}
            />
            <Route
              path="admin/dashboard"
              element={
                user ? (
                  <Admin AdminComponent={<AdminDashboard />} dashboard={true} />
                ) : (
                  <Navigate replace to="/login" />
                )
              }
            />
            <Route
              path="admin/employees"
              element={
                user ? (
                  <Admin AdminComponent={<Employees />} employees={true} />
                ) : (
                  <Navigate replace to="/login" />
                )
              }
            />
          </Route>

          {/* Employee Routes */}
          <Route element={<EmployeeLayout />}>
            <Route
              path="employee/dashboard"
              element={
                user ? (
                  <Employee
                    EmployeeComponent={<EmployeeDashboard />}
                    dashboard={true}
                  />
                ) : (
                  <Navigate replace to="/login" />
                )
              }
            />
          </Route>
          <Route element={<EmployeeLayout />}>
            <Route
              path="employee/tasks"
              element={
                user ? (
                  <Employee EmployeeComponent={<CreateTask />} />
                ) : (
                  <Navigate replace to="/login" />
                )
              }
            />
          </Route>
          {/* Public Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
          </Route>
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
