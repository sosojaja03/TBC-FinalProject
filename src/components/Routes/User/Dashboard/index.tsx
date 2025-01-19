import { IsAuthorisedGuard } from "@/components/route-guards/AuthGuard";
import { Layout } from "lucide-react";
import { lazy, Suspense } from "react";
import { Route } from "react-router-dom";
import { DASHBOARD_PATHS } from "./dashboard.enum";

const MainPage = lazy(() => import("@/components/main/MainPage"));
const AboutPage = lazy(() => import("@/components/About/About"));
const AuthorPage = lazy(() => import("@/components/AuthorPage/SingleAuthor"));
const BlogView = lazy(() => import("@/components/Blogs/Blog"));
const ProfileView = lazy(() => import("@/components/Profile/view/profile"));

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
          <BlogView />
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
