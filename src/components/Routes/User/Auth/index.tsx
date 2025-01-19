import { AuthLayout } from "@/components/Layout/authLayout";
import { IsUnAuthorisedGuard } from "@/components/route-guards/AuthGuard";
import { lazy, Suspense } from "react";
import { Route, Navigate } from "react-router-dom";
import { AUTH_PATHS } from "./auth.enum";

const SignInPage = lazy(() => import("@/components/Registration/ProfileForm"));
const RegistrationPage = lazy(
  () => import("@/components/Registration/Registration"),
);

export const AUTH_ROUTES = [
  <Route
    path="/auth/*"
    element={
      <IsUnAuthorisedGuard>
        <AuthLayout />
      </IsUnAuthorisedGuard>
    }
  >
    <Route index element={<Navigate to="/auth/sign-in" replace />} />
    <Route
      path={AUTH_PATHS.SIGN_IN}
      element={
        <Suspense fallback={<div>Loading...</div>}>
          <SignInPage />
        </Suspense>
      }
    />
    <Route
      path={AUTH_PATHS.SIGN_UP}
      element={
        <Suspense fallback={<div>Loading...</div>}>
          <RegistrationPage />
        </Suspense>
      }
    />
  </Route>,
];
