import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserLogin from "./logsign/UserLogin";
import UserSignup from "./logsign/UserSignup";
import Navbar from "./components/Navbar";
import Landing from "./components/Landing";
function App() {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/signup" element={<UserSignup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;