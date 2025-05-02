import {BrowserRouter as Router, Routes ,Route, Outlet, Navigate} from "react-router-dom";
import { UserContext, UserProvider } from "./context/userContext";

import './App.css'

import Register from "./pages/auth/register";
import Login from "./pages/auth/login";
import Header from "./components/Header";
import { useContext } from "react";
import ProtectedRoute from "./components/ProtectedRoute";
import HomeLayout from "./pages/common/HomeLayout";
import ProjectProvider from "./context/projectContext";

function App() {

  return (
    <>
    <UserProvider>
      <ProjectProvider>
      <Router>
        <Header />
        <Routes>
           <Route path="/register" element={<Register />} />
           <Route path="/login" element={<Login />} />

           <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
            <Route path="/admin/dashboard" element={<HomeLayout />} />
           </Route>

           {/* default route */}

           <Route path="/" element={<Root />} />
        </Routes>
      </Router>
      </ProjectProvider>
    </UserProvider>
    </>
  )
}

const Root = () => {
  const {user, loading} = useContext(UserContext);

  if(loading) {
    return <Outlet />
  }

  if(!user) {
    return <Navigate to="/login" />
  }

  return user.role == "admin" ? <Navigate to="/admin/dashboard" /> : <Navigate to="/user/dashboard" />;
}

export default App
