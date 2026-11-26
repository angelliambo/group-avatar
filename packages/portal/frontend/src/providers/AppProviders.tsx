import React, { ReactNode } from "react";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "../contexts/AuthContext";
import { ProgressProvider } from "../contexts/ProgressContext";
import { ThemeProvider } from "../styles/ThemeProvider";
import { ResponsiveProvider } from "../contexts/ResponsiveContext";
import { PersonalizationProvider } from '@design-sys/contexts/PersonalizationContext';
import { SnackbarProvider } from '@design-sys/atoms/Snackbar';
import { I18nProvider } from "../i18n/I18nProvider";
import { QueryProvider } from "./QueryProvider";

interface AppProvidersProps {
  children: ReactNode;
}

export const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <HelmetProvider>
      <QueryProvider>
        <AuthProvider>
          <I18nProvider>
            <ResponsiveProvider>
              <ProgressProvider>
                <ThemeProvider>
                  <PersonalizationProvider>
                    <SnackbarProvider>
                      {children}
                    </SnackbarProvider>
                  </PersonalizationProvider>
                </ThemeProvider>
              </ProgressProvider>
            </ResponsiveProvider>
          </I18nProvider>
        </AuthProvider>
      </QueryProvider>
    </HelmetProvider>
  );
};
