import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Single from "./pages/SinglePage/Single";
import Write from "./pages/Write/Write";
import Settings from "./pages/Settings/Settings";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import { Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context/Context";

function App(props) {
  const { user } = useContext(Context);
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/write" element={<Write />} />
        <Route path="/post/:postId" element={<Single />} />

        <Route path="/settings" element={<Settings />} />
        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
