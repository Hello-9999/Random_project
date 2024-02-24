// import "./App.css";
import { Routes, Route } from "react-router-dom";
import Admin_login from "./pages/Admin_login";

function App() {
  return (
    <>
      <Routes>
        <Route path="/iamadmin" element={<Admin_login />} />
      </Routes>
    </>
  );
}

export default App;
