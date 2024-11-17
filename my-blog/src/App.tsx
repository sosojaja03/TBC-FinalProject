import { ThemeProvider } from "./components/nav/theme-provider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainPage } from "./components/main/MainPage";
import { Layout } from "./components/Layout/Layout";
import SignInPage from "./components/Registration/ProfileForm";
import RegistrationForm from "./components/Registration/Registration";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<MainPage />} /> {/* Default route */}
            <Route path="sign-in" element={<SignInPage />}></Route>
            <Route path="registration" element={<RegistrationForm />} />
            <Route path="MainPage" element={<MainPage />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
