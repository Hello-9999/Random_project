// import "./App.css";
import { Routes, Route } from "react-router-dom";
import Admin_login from "./pages/Admin_login";
import Admin_home from "./pages/Admin_home";
import Admin_addevent from "./pages/Admin_addevent";

function App() {
  return (
    <>
      <Routes>
        <Route path="/iamadmin" element={<Admin_login />} />
        <Route path="/adminhome" element={<Admin_home />} />
        <Route path='/admin_addevent' element={<Admin_addevent />} />
      </Routes>
    </>
  );
}

export default App;
