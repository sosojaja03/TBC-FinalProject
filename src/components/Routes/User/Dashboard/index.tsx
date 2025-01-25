import { IsAuthorisedGuard } from "@/components/RouteGuards/AuthGuard";
import { Layout } from "@/components/Layout/Layout";
import { lazy, Suspense } from "react";
import { Route } from "react-router-dom";
import { DASHBOARD_PATHS } from "./dashboard.enum";

const MainPage = lazy(() => import("@/components/Pages/MainPage/MainPage"));
const AboutPage = lazy(() => import("@/components/Pages/AboutPage/About"));
const AuthorPage = lazy(
  () => import("@/components/Pages/AuthorPage/SingleAuthor"),
);
const ReviewView = lazy(() => import("@/components/Pages/Reviews/Reviews"));
const ProfileView = lazy(
  () => import("@/components/Pages/Profile/view/ProfilePage"),
);

export const DASHBOARD_ROUTES = [
  <Route
    path="/dashboard/*"
    element={
      <IsAuthorisedGuard>
        <Layout />
      </IsAuthorisedGuard>
    }
  >
    <Route
      path={DASHBOARD_PATHS.MAINPAGE}
      element={
        <Suspense fallback={<div>Loading...</div>}>
          <MainPage />
        </Suspense>
      }
    />
    <Route
      path={DASHBOARD_PATHS.ABOUT}
      element={
        <Suspense fallback={<div>Loading...</div>}>
          <AboutPage />
        </Suspense>
      }
    />
    <Route
      path={DASHBOARD_PATHS.REVIEW_LIST}
      element={
        <Suspense fallback={<div>Loading...</div>}>
          <ReviewView />
        </Suspense>
      }
    />
    <Route
      path={DASHBOARD_PATHS.PROFILE}
      element={
        <Suspense fallback={<div>Loading...</div>}>
          <ProfileView />
        </Suspense>
      }
    />
    <Route
      path={DASHBOARD_PATHS.AUTHORS + "/:authorId"}
      element={
        <Suspense fallback={<div>Loading...</div>}>
          <AuthorPage />
        </Suspense>
      }
    />
  </Route>,
];
