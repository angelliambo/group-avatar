import React, { ReactNode } from "react";
import { ConfigProvider, theme as antdTheme } from "antd";
import { createGlobalStyle } from "styled-components";
import { useTheme } from "../styles/ThemeProvider";

const AntdGlobalOverrides = createGlobalStyle`
  .ant-layout,
  .ant-layout-content {
    background-color: var(--color-background-primary);
  }
  .ant-card {
    background-color: var(--color-background-card);
    border-color: var(--color-border-light);
    border-width: 1px;
    border-style: solid;
  }
  .ant-card-body,
  .ant-typography,
  .ant-typography h1,
  .ant-typography h2,
  .ant-typography h3,
  .ant-typography h4,
  .ant-typography h5,
  .ant-typography h6 {
    color: var(--color-text-primary);
  }
  .ant-typography p {
    color: var(--color-text-secondary);
  }
  .ant-input {
    background-color: var(--color-background-card);
    border-color: var(--color-border-normal);
    color: var(--color-text-primary);
  }
  .ant-drawer-content,
  .ant-drawer-body {
    background-color: var(--color-background-primary);
  }
  .ant-drawer-header,
  .ant-tooltip-inner {
    background-color: var(--color-background-card);
    color: var(--color-text-primary);
  }
`;

export const AntdThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { theme, currentTheme } = useTheme();

  const antdThemeConfig = React.useMemo(() => {
    if (!currentTheme) return {};

    const rawRadius = currentTheme.borderRadius?.md || "8px";
    const parsedRadius = parseInt(rawRadius, 10) || 8;

    return {
      algorithm: theme === "dark" ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
      token: {
        colorPrimary: currentTheme.colors?.primary?.[500] || "#3b82f6",
        colorSuccess: currentTheme.colors?.success?.[500] || "#22c55e",
        colorWarning: currentTheme.colors?.warning?.[500] || "#f59e0b",
        colorError: currentTheme.colors?.error?.[500] || "#ef4444",
        colorInfo: currentTheme.colors?.info?.[500] || "#3b82f6",
        colorBgContainer: currentTheme.colors?.background?.card || "#ffffff",
        colorBgLayout: currentTheme.colors?.background?.primary || "#f0f0f0",
        colorText: currentTheme.colors?.text?.primary || "#171717",
        colorTextDescription: currentTheme.colors?.text?.secondary || "#525252",
        colorBorder: currentTheme.colors?.border?.light || "#f5f5f5",
        borderRadius: parsedRadius,
        fontFamily: currentTheme.typography?.fontFamily?.primary || "inherit",
      },
    };
  }, [theme, currentTheme]);

  return (
    <ConfigProvider theme={antdThemeConfig}>
      <AntdGlobalOverrides />
      {children}
    </ConfigProvider>
  );
};

export default AntdThemeProvider;
