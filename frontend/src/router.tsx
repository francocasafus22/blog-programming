import { Routes, BrowserRouter, Route } from "react-router-dom";
import Home from "./pages/Home";
import Notifications from "./pages/Notifications";
import Following from "./pages/Following";
import Explore from "./pages/Explore";
import Navbar from "./components/Navbar";

export default function Router() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/explore" element={<Explore></Explore>}></Route>
        <Route path="/following" element={<Following></Following>}></Route>
        <Route
          path="/notifications"
          element={<Notifications></Notifications>}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}
