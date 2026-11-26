import React, { memo, lazy, Suspense, useState, useEffect } from "react";
import { GlobalStyles } from "./components/GlobalStyles";
import { AppProviders } from "./providers/AppProviders";
import AppRouter from "./router";
import ErrorBoundary from "./components/ErrorBoundary";
import { AppContainer } from "./App.styles";

const OfflineIndicator = lazy(() => import("./components/OfflineIndicator"));

const App = memo(() => {
  const [hasBeenOffline, setHasBeenOffline] = useState(() =>
    typeof navigator !== "undefined" ? !navigator.onLine : false
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleOffline = () => setHasBeenOffline(true);
    window.addEventListener("offline", handleOffline);
    return () => window.removeEventListener("offline", handleOffline);
  }, []);

  return (
    <AppProviders>
      <ErrorBoundary>
        <GlobalStyles />
        <AppContainer>
          <AppRouter />
          {hasBeenOffline && (
            <Suspense fallback={null}>
              <OfflineIndicator showDetails={true} position="top" />
            </Suspense>
          )}
        </AppContainer>
      </ErrorBoundary>
    </AppProviders>
  );
});

App.displayName = "App";

export default App;
