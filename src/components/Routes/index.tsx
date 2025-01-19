import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { DASHBOARD_ROUTES } from "./User/Dashboard";
import { ThemeProvider } from "../nav/theme-provider";
import { AUTHENTICATION_ROUTES } from "./User";

const queryClient = new QueryClient();

export const AppRoutes = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <BrowserRouter>
          <Routes>
            {/* Root redirect */}
            <Route path="/" element={<Navigate to="/auth/sign-in" replace />} />

            {/* Authentication Routes */}
            {AUTHENTICATION_ROUTES}

            {/* Dashboard Routes */}
            {DASHBOARD_ROUTES}

            {/* Not Found */}
            <Route path="*" element={<div>Page not found</div>} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
};
