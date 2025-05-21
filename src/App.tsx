import { BrowserRouter, Routes, Route } from "react-router-dom";
import DefaultLayout from "./pages/Layout/DefaultLayout";
import Signup from "./pages/Signup";
import Welcome from "./pages/Welcome";
import Home from "./pages/Home";
import UserProfileEditPage from "./pages/UserProfileEditPage";
import SignupProfile from "./pages/SignupProfile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signup-profile" element={<SignupProfile />} />
        <Route path="/welcome" element={<Welcome />} />

        {/* 공통 레이아웃 */}
        <Route element={<DefaultLayout />}>
          {/* <Route path="/home" element={<Home />} /> */}
          <Route path="/profile/edit" element={<UserProfileEditPage />} />
          {/* <Route path="/points" element={<Points />} />
          <Route path="/settings" element={<Settings />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
