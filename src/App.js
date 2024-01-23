import "./App.css";
import HomePage from "./pages/website/HomePage";
import { Routes, Route } from 'react-router-dom';
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Users from "./pages/dashboard/Users";
import GoogleCallBack from "./pages/auth/GoogleCallBack";
import Dashboard from "./pages/dashboard/Dashboard";
import RequireAuth from "./pages/auth/RequireAuth";
import UserUpdate from "./pages/dashboard/UserUpdate";

function App() {
  return (
    <div className="App">
      <Routes>
        {/* public routes */}
        <Route exact path='/' element={<HomePage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path="/auth.google.callback" element={<GoogleCallBack />} />
        {/* protected routes */}
        <Route element={<RequireAuth />}>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="users" element={<Users />} />
            <Route path="users/:id" element={<UserUpdate />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;