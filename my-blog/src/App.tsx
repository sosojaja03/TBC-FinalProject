import { ThemeProvider } from "./components/nav/theme-provider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainPage } from "./components/main/MainPage";
import { Layout } from "./components/Layout/Layout";
import SignInPage from "./components/Registration/ProfileForm";
import RegistrationForm from "./components/Registration/Registration";
import AboutPage from "./components/About/About";
import AuthorPage from "./components/AuthorPage/SingleAuthor";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<MainPage />} />
              <Route path="sign-in" element={<SignInPage />}></Route>
              <Route path="about" element={<AboutPage />}></Route>
              <Route path="registration" element={<RegistrationForm />} />
              <Route path="MainPage" element={<MainPage />}></Route>
              <Route path="author/:authorId" element={<AuthorPage />}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
