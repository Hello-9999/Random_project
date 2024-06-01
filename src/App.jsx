// import "./App.css";
import { Routes, Route } from "react-router-dom";
import Client_home from "./pages/client/Client_home";
import Admin_event from "./pages/admin/Admin Event/Admin_event";
import Admin_addevent from "./pages/admin/Admin Event/Admin_addevent";
import Admin_login from "./pages/admin/Admin_login";
import Admin_member from "./pages/admin/Admin Member/Admin_member";
import Admin_addmember from "./pages/admin/Admin Member/Admin_addmember";
import Admin_gallery from "./pages/admin/Admin Gallery/Admin_gallery";
import Admin_Event_Detail from "./pages/admin/Admin_Event_Detail";
import Admin_Home from "./pages/admin/Admin Home/Admin_Home";
import ProtectedRoute from "./pages/ProtectedRoute";

function App() {
  return (
    <>
      <Routes>
        <Route path="/iamadmin" element={<Admin_login />} />

        <Route path="" element={<ProtectedRoute />}>
          <Route path="adminhome" element={<Admin_Home />} />
          <Route path="adminmember" element={<Admin_member />} />
          <Route path="adminevent/:path" element={<Admin_addevent />} />
          <Route path="adminmember/:path" element={<Admin_addmember />} />
          <Route path="eventDetail/:uid" element={<Admin_Event_Detail />} />
          <Route path="admingallery" element={<Admin_gallery />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
