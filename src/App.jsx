// import "./App.css";
import { Routes, Route } from "react-router-dom";
import Client_home from "./pages/client/Client_home";
import Admin_home from "./pages/admin/Admin Home/Admin_home";
import Admin_event from "./pages/admin/Admin Event/Admin_event";
import Admin_addevent from "./pages/admin/Admin Event/Admin_addevent";
import Admin_login from "./pages/admin/Admin_login";
import Admin_member from "./pages/admin/Admin Member/Admin_member";
import Admin_addmember from "./pages/admin/Admin Member/Admin_addmember";
import Admin_blog from "./pages/admin/Admin Blog/Admin_blog";
import Admin_gallery from "./pages/admin/Admin Gallery/Admin_gallery";
import Admin_Event_Detail from "./pages/admin/Admin_Event_Detail";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Client_home />} />
        <Route path="/iamadmin" element={<Admin_login />} />
        <Route path="/admin_home" element={<Admin_home />} />
        <Route path="/admin_event/" element={<Admin_event />} />
        <Route path="/admin_event/:path" element={<Admin_addevent />} />
        <Route path="/event_Detail/:uid" element={<Admin_Event_Detail />} />
        <Route path="/admin_member" element={<Admin_member />} />
        <Route path="/admin_member/:path" element={<Admin_addmember />} />
        <Route path="/admin_blog" element={<Admin_blog />} />
        <Route path="/admin_gallery" element={<Admin_gallery />} />
      </Routes>
    </>
  );
}

export default App;
