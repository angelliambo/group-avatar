import { HomeOutlined, CarOutlined, InboxOutlined } from "@ant-design/icons";
import { ZnIcon } from "@shared/design-sys/atoms/ZnIcon";

export interface NavigationSubItem {
  key: string;
  label: string;
  path: string;
  icon?: React.ReactNode;
}

export interface NavigationItem {
  key: string;
  label: string;
  path?: string;
  icon: React.ReactNode;
  children?: NavigationSubItem[];
}

export const getNavigationItems = (): NavigationItem[] => {
  return [
    {
      key: "home",
      label: "Inicio",
      path: "/",
      icon: <ZnIcon icon={HomeOutlined} />,
    },
    {
      key: "logistica",
      label: "Logística",
      path: "/logistica",
      icon: <ZnIcon icon={CarOutlined} />,
    },
    {
      key: "mudanzas",
      label: "Mudanzas",
      path: "/mudanzas",
      icon: <ZnIcon icon={InboxOutlined} />,
    },
  ];
};
