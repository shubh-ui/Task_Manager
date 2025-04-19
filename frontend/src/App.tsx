import {BrowserRouter as Router, Routes ,Route} from "react-router-dom";
import './App.css'

import Register from "./pages/auth/register";
import Login from "./pages/auth/login";
import Header from "./components/Header";

function App() {

  return (
    <>
      <Router>
        <Header />
        <Routes>
           <Route path="/register" element={<Register />} />
           <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
