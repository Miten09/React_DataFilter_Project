import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./component/Login";
import Encounters from "./component/Encounters";
import Patients from "./component/Patients";
import Navbar from "./component/Navbar";
import ProtectedRoutes from "./component/ProtectedRoutes";
import Details from "./component/Details";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoutes Component={Navbar} />}>
          <Route path="/encounters" element={<Encounters />} />
          <Route path="/patients" element={<Patients />} />
          <Route path="/:details/patients-details/:id" element={<Details />} />
          <Route path="*" element={<Navigate to="/encounters" />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
