import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./components/Sign-Up/Main";
import Signup from "./components/Sign-Up";
import Login from "./components/Sign-Up/Login";

function App() {
  const user = localStorage.getItem("token");
  return (
    <Routes>
      {user && (
        <Route path="/" exact element={<Main />}>
          {" "}
        </Route>
      )}
      <Routes path="/signup" exact element={<Signup />} />
      <Routes path="/login" exact element={<Login />} />
      <Routes path="/" exact element={<Navigate replace to="/login" />} />
    </Routes>
  );
}

export default App;
