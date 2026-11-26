import React, { Suspense, lazy } from "react";
import {
  createRootRouteWithContext,
  createRoute,
  createRouter,
  RouterProvider,
  Outlet,
} from "@tanstack/react-router";
import { QueryClient } from "@tanstack/react-query";
import { queryClient } from "./providers/QueryProvider";
import Loading from "./components/loading";
import Layout from "./components/Layout";
import { useAuth } from "./contexts/AuthContext";
import HomePage from "./pages/HomePage";

const TanStackRouterDevtools =
  process.env.NODE_ENV === "development"
    ? lazy(() =>
        import("@tanstack/router-devtools").then((m) => ({
          default: m.TanStackRouterDevtools,
        }))
      )
    : null;

const LogisticsPage = lazy(() => import("./pages/LogisticsPage"));
const MovingPage = lazy(() => import("./pages/MovingPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const TermsAndConditionsPage = lazy(() => import("./pages/legal/TermsAndConditionsPage"));
const PrivacyPolicyPage = lazy(() => import("./pages/legal/PrivacyPolicyPage"));

export interface RouterContext {
  queryClient: QueryClient;
  auth?: ReturnType<typeof useAuth>;
}

const rootRoute = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <Suspense fallback={<Loading />}>
      <Outlet />
      {process.env.NODE_ENV === "development" && TanStackRouterDevtools && (
        <Suspense fallback={null}>
          <TanStackRouterDevtools position="bottom-left" />
        </Suspense>
      )}
    </Suspense>
  ),
  notFoundComponent: () => <NotFoundPage />,
});

const layoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "layout",
  component: () => <Layout />,
});

const indexRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/",
  component: () => <HomePage />,
});

const logisticaRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/logistica",
  component: () => <LogisticsPage />,
});

const mudanzasRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/mudanzas",
  component: () => <MovingPage />,
});

const termsRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/legal/terms",
  component: () => <TermsAndConditionsPage />,
});

const privacyRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/legal/privacy",
  component: () => <PrivacyPolicyPage />,
});

const routeTree = rootRoute.addChildren([
  layoutRoute.addChildren([
    indexRoute,
    logisticaRoute,
    mudanzasRoute,
    termsRoute,
    privacyRoute,
  ]),
]);

export const router = createRouter({
  routeTree,
  context: {
    queryClient,
  },
  defaultPreload: "intent",
  defaultPreloadDelay: 50,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export const AppRouter: React.FC = () => {
  const auth = useAuth();
  return <RouterProvider router={router} context={{ queryClient, auth }} />;
};

export default AppRouter;
