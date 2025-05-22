import { BrowserRouter, Routes, Route } from "react-router-dom";
import DefaultLayout from "./pages/Layout/DefaultLayout";
import Signup from "./pages/Signup";
import Welcome from "./pages/Welcome";
import Home from "./pages/Home";
import UserProfileEditPage from "./pages/UserProfileEditPage";
import SignupProfile from "./pages/SignupProfile";
import BusinessProfileEditPage from "./pages/BusinessProfileEditPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signup-profile" element={<SignupProfile />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route
          path="/profile/business/edit"
          element={<BusinessProfileEditPage />}
        />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        {/* 공통 레이아웃 */}
        <Route element={<DefaultLayout />}>
          {/* <Route path="/home" element={<Home />} /> */}
          <Route path="/profile/edit" element={<UserProfileEditPage />} />
          {/* <Route path="/points" element={<Points />} />ㅇㅇ
          <Route path="/settings" element={<Settings />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
